from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import UserProfile, UserPreferences

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile_and_preferences(sender, instance, created, **kwargs):
    """
    Signal to automatically create profile and preferences when a user is created
    """
    if created:
        UserProfile.objects.create(user=instance)
        UserPreferences.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile_and_preferences(sender, instance, **kwargs):
    """
    Signal to save profile and preferences when user is saved
    """
    # Create profile if it doesn't exist
    if not hasattr(instance, 'profile'):
        UserProfile.objects.create(user=instance)
    else:
        instance.profile.save()
    
    # Create preferences if they don't exist
    if not hasattr(instance, 'preferences'):
        UserPreferences.objects.create(user=instance)
    else:
        instance.preferences.save()
