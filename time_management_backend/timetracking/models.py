from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class Project(models.Model):
    """
    Projects that users can track time against
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    client = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Project manager
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_projects'
    )
    
    # Team members
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='assigned_projects',
        blank=True
    )
    
    # Budget in hours
    budget_hours = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        help_text=_('Total budgeted hours for this project')
    )
    
    def __str__(self):
        return self.name
    
    @property
    def total_tracked_hours(self):
        """Calculate total hours tracked for this project"""
        entries = TimeEntry.objects.filter(project=self)
        total_seconds = sum(entry.duration_seconds for entry in entries)
        return total_seconds / 3600  # Convert seconds to hours
    
    @property
    def budget_remaining(self):
        """Calculate remaining budget hours"""
        if self.budget_hours is None:
            return None
        return self.budget_hours - self.total_tracked_hours


class Task(models.Model):
    """
    Tasks within projects that users can track time against
    """
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Task assignees
    assignees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='assigned_tasks',
        blank=True
    )
    
    # Estimated hours
    estimated_hours = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        blank=True,
        null=True,
        help_text=_('Estimated hours to complete this task')
    )
    
    # Due date
    due_date = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.project.name})"
    
    @property
    def total_tracked_hours(self):
        """Calculate total hours tracked for this task"""
        entries = TimeEntry.objects.filter(task=self)
        total_seconds = sum(entry.duration_seconds for entry in entries)
        return total_seconds / 3600  # Convert seconds to hours
    
    @property
    def is_overdue(self):
        """Check if task is overdue"""
        if self.due_date and not self.is_completed:
            return self.due_date < timezone.now().date()
        return False


class TimeEntry(models.Model):
    """
    Time entries recorded by users
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='time_entries'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='time_entries'
    )
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name='time_entries',
        blank=True,
        null=True
    )
    description = models.TextField(blank=True, null=True)
    
    # Time tracking
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    is_running = models.BooleanField(default=False)
    
    # Manual duration (for entries without start/end time)
    manual_duration = models.DurationField(blank=True, null=True)
    
    # Billable status
    is_billable = models.BooleanField(default=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-start_time']
        verbose_name = 'Time Entry'
        verbose_name_plural = 'Time Entries'
    
    def __str__(self):
        return f"{self.user.username} - {self.project.name} - {self.start_time.date()}"
    
    def clean(self):
        """Validate time entry data"""
        # Check that end_time is after start_time
        if self.end_time and self.start_time and self.end_time < self.start_time:
            raise ValidationError(_('End time must be after start time'))
        
        # Check that either end_time or is_running is set
        if not self.end_time and not self.is_running and not self.manual_duration:
            raise ValidationError(_('Either end time, manual duration, or running status must be set'))
        
        # Check that task belongs to the selected project
        if self.task and self.task.project != self.project:
            raise ValidationError(_('Task must belong to the selected project'))
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    @property
    def duration_seconds(self):
        """Calculate duration in seconds"""
        if self.manual_duration:
            return self.manual_duration.total_seconds()
        
        if self.end_time:
            return (self.end_time - self.start_time).total_seconds()
        
        if self.is_running:
            return (timezone.now() - self.start_time).total_seconds()
        
        return 0
    
    @property
    def duration_formatted(self):
        """Format duration as HH:MM:SS"""
        seconds = int(self.duration_seconds)
        hours, remainder = divmod(seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"


class TimeTrackingSettings(models.Model):
    """
    Settings for time tracking per user
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='time_tracking_settings'
    )
    
    # Work hours
    work_hours_per_day = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default=8.0,
        help_text=_('Standard work hours per day')
    )
    work_days_per_week = models.IntegerField(
        default=5,
        help_text=_('Standard work days per week')
    )
    
    # Reminders
    reminder_enabled = models.BooleanField(
        default=True,
        help_text=_('Enable reminders to track time')
    )
    reminder_time = models.TimeField(
        default=timezone.datetime.strptime('17:00', '%H:%M').time(),
        help_text=_('Time to send daily reminders')
    )
    
    # Overtime settings
    overtime_threshold_daily = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        default=8.0,
        help_text=_('Daily hours threshold for overtime alerts')
    )
    overtime_threshold_weekly = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=40.0,
        help_text=_('Weekly hours threshold for overtime alerts')
    )
    
    def __str__(self):
        return f"Time tracking settings for {self.user.username}"
