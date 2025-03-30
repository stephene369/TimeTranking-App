from rest_framework import permissions

class IsProjectMemberOrAdmin(permissions.BasePermission):
    """
    Permission to only allow members of a project or admins to access it
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Allow if user is admin
        if user.is_staff or user.is_superuser:
            return True
        
        # Allow if user is the project manager
        if obj.manager == user:
            return True
        
        # Allow if user is a member of the project
        if user in obj.members.all():
            return True
        
        return False


class IsTimeEntryOwnerOrAdmin(permissions.BasePermission):
    """
    Permission to only allow owners of a time entry or admins to access it
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Allow if user is admin
        if user.is_staff or user.is_superuser:
            return True
        
        # Allow if user is the owner of the time entry
        if obj.user == user:
            return True
        
        # Allow if user is the manager of the time entry owner
        if hasattr(obj.user, 'manager') and obj.user.manager == user:
            return True
        
        # Allow if user is the manager of the project
        if obj.project.manager == user:
            return True
        
        return False
