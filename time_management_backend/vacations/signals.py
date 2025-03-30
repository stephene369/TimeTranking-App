from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from django.utils import timezone
from .models import VacationRequest, VacationBalance, VacationType

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_vacation_balances(sender, instance, created, **kwargs):
    """
    Create vacation balances for new users
    """
    if created:
        # Create balance for each active vacation type
        for vacation_type in VacationType.objects.filter(is_active=True, counts_against_balance=True):
            VacationBalance.objects.create(
                user=instance,
                vacation_type=vacation_type,
                year=timezone.now().year
            )

@receiver(post_save, sender=VacationRequest)
def update_vacation_balance(sender, instance, created, **kwargs):
    """
    Update vacation balance when a request is approved or cancelled
    """
    if not created and instance.vacation_type.counts_against_balance:
        # Get or create balance
        balance, created = VacationBalance.objects.get_or_create(
            user=instance.user,
            vacation_type=instance.vacation_type,
            year=timezone.now().year
        )
        
        # Update balance based on request status
        if instance.status == 'approved':
            balance.used += instance.hours_requested
            balance.save()
        elif instance.status == 'cancelled' and instance._original_status == 'approved':
            balance.used -= instance.hours_requested
            balance.save()
