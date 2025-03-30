from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class VacationType(models.Model):
    """
    Types of vacation/time-off (e.g., PTO, Sick Leave, Bereavement, etc.)
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    # Whether this type requires approval
    requires_approval = models.BooleanField(default=True)
    
    # Whether this type counts against PTO balance
    counts_against_balance = models.BooleanField(default=True)
    
    # Color for calendar display
    color = models.CharField(max_length=7, default="#3498db")  # Hex color code
    
    # Whether this type is active
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class VacationPolicy(models.Model):
    """
    Vacation policies defining accrual rates, caps, etc.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    # Accrual settings
    accrual_rate = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        help_text=_("Hours accrued per pay period")
    )
    accrual_frequency = models.CharField(
        max_length=20,
        choices=[
            ('daily', 'Daily'),
            ('weekly', 'Weekly'),
            ('biweekly', 'Bi-weekly'),
            ('monthly', 'Monthly'),
            ('annually', 'Annually'),
        ],
        default='biweekly'
    )
    
    # Maximum accrual
    max_accrual = models.DecimalField(
        max_digits=6, 
        decimal_places=2,
        help_text=_("Maximum hours that can be accrued"),
        null=True,
        blank=True
    )
    
    # Carryover settings
    max_carryover = models.DecimalField(
        max_digits=6, 
        decimal_places=2,
        help_text=_("Maximum hours that can be carried over to next year"),
        null=True,
        blank=True
    )
    
    # Waiting period for new employees (in days)
    waiting_period = models.PositiveIntegerField(
        default=90,
        help_text=_("Waiting period in days before new employees can use PTO")
    )
    
    # Whether this policy is active
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


class VacationBalance(models.Model):
    """
    Tracks vacation/PTO balance for each user
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacation_balances'
    )
    
    vacation_type = models.ForeignKey(
        VacationType,
        on_delete=models.CASCADE,
        related_name='balances'
    )
    
    # Current balance in hours
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # Last accrual date
    last_accrual_date = models.DateField(default=timezone.now)
    
    # Policy applied to this balance
    policy = models.ForeignKey(
        VacationPolicy,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='balances'
    )
    
    # Year for annual tracking
    year = models.PositiveIntegerField(default=timezone.now().year)
    
    # Initial balance for the year
    initial_balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # Used hours
    used = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # Accrued hours
    accrued = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    # Adjusted hours (manual adjustments)
    adjusted = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    class Meta:
        unique_together = ('user', 'vacation_type', 'year')
    
    def __str__(self):
        return f"{self.user.username} - {self.vacation_type.name} - {self.year}"
    
    def calculate_balance(self):
        """Calculate current balance based on initial, accrued, used, and adjusted"""
        return self.initial_balance + self.accrued - self.used + self.adjusted
    
    def save(self, *args, **kwargs):
        # Update balance before saving
        self.balance = self.calculate_balance()
        super().save(*args, **kwargs)


class VacationRequest(models.Model):
    """
    Vacation/time-off requests
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacation_requests'
    )
    
    vacation_type = models.ForeignKey(
        VacationType,
        on_delete=models.CASCADE,
        related_name='requests'
    )
    
    # Date range
    start_date = models.DateField()
    end_date = models.DateField()
    
    # Half days
    start_half_day = models.BooleanField(
        default=False,
        help_text=_("Whether the start date is a half day")
    )
    end_half_day = models.BooleanField(
        default=False,
        help_text=_("Whether the end date is a half day")
    )
    
    # Total hours requested
    hours_requested = models.DecimalField(max_digits=6, decimal_places=2)
    
    # Request status
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    
    # Request details
    reason = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Approver
    approver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_vacation_requests'
    )
    
    # Approval details
    approval_date = models.DateTimeField(null=True, blank=True)
    approval_notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.vacation_type.name} - {self.start_date} to {self.end_date}"
    
    def clean(self):
        """Validate vacation request"""
        if self.end_date < self.start_date:
            raise ValidationError(_("End date must be after start date"))
        
        # Check for overlapping requests
        overlapping = VacationRequest.objects.filter(
            user=self.user,
            status__in=['pending', 'approved'],
            start_date__lte=self.end_date,
            end_date__gte=self.start_date
        ).exclude(pk=self.pk)
        
        if overlapping.exists():
            raise ValidationError(_("This request overlaps with an existing request"))
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    @property
    def duration_days(self):
        """Calculate duration in days"""
        delta = self.end_date - self.start_date
        days = delta.days + 1  # Include both start and end dates
        
        # Adjust for half days
        if self.start_half_day:
            days -= 0.5
        if self.end_half_day:
            days -= 0.5
        
        return days


class VacationAdjustment(models.Model):
    """
    Manual adjustments to vacation balances
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacation_adjustments'
    )
    
    vacation_type = models.ForeignKey(
        VacationType,
        on_delete=models.CASCADE,
        related_name='adjustments'
    )
    
    # Adjustment amount (positive or negative)
    hours = models.DecimalField(max_digits=6, decimal_places=2)
    
    # Adjustment details
    reason = models.TextField()
    
    # Who made the adjustment
    adjusted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='made_vacation_adjustments'
    )
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.vacation_type.name} - {self.hours} hours"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Update the user's vacation balance
        balance, created = VacationBalance.objects.get_or_create(
            user=self.user,
            vacation_type=self.vacation_type,
            year=timezone.now().year
        )
        
        balance.adjusted += self.hours
        balance.save()


class VacationAccrual(models.Model):
    """
    Records of vacation accruals
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='vacation_accruals'
    )
    
    vacation_type = models.ForeignKey(
        VacationType,
        on_delete=models.CASCADE,
        related_name='accruals'
    )
    
    # Accrual amount
    hours = models.DecimalField(max_digits=6, decimal_places=2)
    
    # Accrual date
    accrual_date = models.DateField()
    
    # Accrual period
    period_start = models.DateField()
    period_end = models.DateField()
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.vacation_type.name} - {self.hours} hours - {self.accrual_date}"
