from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Adds additional fields needed for the time management system.
    """
    EMPLOYEE = 'employee'
    MANAGER = 'manager'
    HR_ADMIN = 'hr_admin'
    SYSTEM_ADMIN = 'system_admin'
    VSS_COACH = 'vss_coach'
    
    ROLE_CHOICES = [
        (EMPLOYEE, _('Employee')),
        (MANAGER, _('Manager')),
        (HR_ADMIN, _('HR Administrator')),
        (SYSTEM_ADMIN, _('System Administrator')),
        (VSS_COACH, _('VSS Coach')),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=EMPLOYEE,
        help_text=_('User role determines permissions')
    )
    employee_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    job_title = models.CharField(max_length=100, blank=True, null=True)
    manager = models.ForeignKey(
        'self', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='team_members'
    )
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.username})"
    
    @property
    def is_manager(self):
        return self.role in [self.MANAGER, self.HR_ADMIN, self.SYSTEM_ADMIN]
    
    @property
    def is_hr(self):
        return self.role in [self.HR_ADMIN, self.SYSTEM_ADMIN]
    
    @property
    def is_admin(self):
        return self.role == self.SYSTEM_ADMIN
    
    @property
    def is_coach(self):
        return self.role == self.VSS_COACH


class UserProfile(models.Model):
    """
    Extended profile information for users.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='profile'
    )
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=100, blank=True, null=True)
    emergency_phone = models.CharField(max_length=20, blank=True, null=True)
    hire_date = models.DateField(blank=True, null=True)
    
    # PTO related fields
    pto_accrual_rate = models.FloatField(default=1.5, help_text=_('PTO days accrued per month'))
    pto_maximum_balance = models.FloatField(default=30, help_text=_('Maximum PTO days allowed'))
    pto_rollover_eligible = models.BooleanField(default=True)
    pto_special_arrangement = models.TextField(blank=True, null=True)
    
    # Accommodation related fields
    has_accommodations = models.BooleanField(default=False)
    accommodation_details = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Profile for {self.user.get_full_name()}"


class UserPreferences(models.Model):
    """
    User preferences for notifications, display, etc.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='preferences'
    )
    
    # Notification preferences
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    pto_reminder_days = models.IntegerField(default=30, help_text=_('Days before PTO expiry to send reminder'))
    
    # Display preferences
    theme = models.CharField(max_length=20, default='light')
    items_per_page = models.IntegerField(default=10)
    
    # Calendar preferences
    calendar_integration = models.BooleanField(default=False)
    calendar_sync_token = models.CharField(max_length=255, blank=True, null=True)
    
    # Accessibility preferences
    high_contrast = models.BooleanField(default=False)
    large_text = models.BooleanField(default=False)
    screen_reader_optimized = models.BooleanField(default=False)
    
    # Language preference
    language = models.CharField(max_length=10, default='en')
    
    def __str__(self):
        return f"Preferences for {self.user.username}"
