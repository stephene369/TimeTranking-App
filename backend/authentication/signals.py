from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    Signal pour créer automatiquement un profil lorsqu'un utilisateur est créé
    """
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    """
    Signal pour sauvegarder le profil lorsque l'utilisateur est sauvegardé
    """
    instance.profile.save()
