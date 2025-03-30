from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserProfile, UserPreferences

User = get_user_model()

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'

class UserPreferencesInline(admin.StackedInline):
    model = UserPreferences
    can_delete = False
    verbose_name_plural = 'Preferences'

class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline, UserPreferencesInline)
    list_display = ('username', 'email', 'first_name', 'last_name', 'role', 'department', 'is_staff')
    list_filter = ('role', 'department', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Employment info', {'fields': ('role', 'employee_id', 'department', 'job_title', 'manager')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'department'),
        }),
    )
    search_fields = ('username', 'email', 'first_name', 'last_name', 'employee_id')
    ordering = ('username',)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
