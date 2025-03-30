from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from users.models import UserProfile, UserPreferences

User = get_user_model()

class Command(BaseCommand):
    help = 'Create default user roles and permissions'

    def handle(self, *args, **kwargs):
        # Create groups for each role
        employee_group, created = Group.objects.get_or_create(name='Employee')
        manager_group, created = Group.objects.get_or_create(name='Manager')
        hr_admin_group, created = Group.objects.get_or_create(name='HR Admin')
        system_admin_group, created = Group.objects.get_or_create(name='System Admin')
        vss_coach_group, created = Group.objects.get_or_create(name='VSS Coach')
        
        # Get content types
        user_ct = ContentType.objects.get_for_model(User)
        profile_ct = ContentType.objects.get_for_model(UserProfile)
        preferences_ct = ContentType.objects.get_for_model(UserPreferences)
        
        # Create permissions for User model
        view_user = Permission.objects.get(content_type=user_ct, codename='view_user')
        add_user = Permission.objects.get(content_type=user_ct, codename='add_user')
        change_user = Permission.objects.get(content_type=user_ct, codename='change_user')
        delete_user = Permission.objects.get(content_type=user_ct, codename='delete_user')
        
        # Create permissions for UserProfile model
        view_profile = Permission.objects.get(content_type=profile_ct, codename='view_userprofile')
        change_profile = Permission.objects.get(content_type=profile_ct, codename='change_userprofile')
        
        # Create permissions for UserPreferences model
        view_preferences = Permission.objects.get(content_type=preferences_ct, codename='view_userpreferences')
        change_preferences = Permission.objects.get(content_type=preferences_ct, codename='change_userpreferences')
        
        # Assign permissions to Employee group
        employee_group.permissions.add(view_user, view_profile, change_profile, view_preferences, change_preferences)
        
        # Assign permissions to Manager group
        manager_group.permissions.add(view_user, view_profile, change_profile, view_preferences, change_preferences)
        
        # Assign permissions to HR Admin group
        hr_admin_group.permissions.add(view_user, add_user, change_user, view_profile, change_profile, view_preferences, change_preferences)
        
        # Assign permissions to System Admin group
        system_admin_group.permissions.add(view_user, add_user, change_user, delete_user, view_profile, change_profile, view_preferences, change_preferences)
        
        # Assign permissions to VSS Coach group
        vss_coach_group.permissions.add(view_user, view_profile)
        
        self.stdout.write(self.style.SUCCESS('Successfully created user roles and permissions'))
