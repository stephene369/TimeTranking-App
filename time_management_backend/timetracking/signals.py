from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import TimeTrackingSettings

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_time_tracking_settings(sender, instance, created, **kwargs):
    """
    Create time tracking settings for new users
    """
    if created:
        TimeTrackingSettings.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_time_tracking_settings(sender, instance, **kwargs):
    """
    Save time tracking settings when user is saved
    """
    if not hasattr(instance, 'time_tracking_settings'):
        TimeTrackingSettings.objects.create(user=instance)
    else:
        instance.time_tracking_settings.save()
