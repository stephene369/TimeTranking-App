from rest_framework import permissions

class IsHROrAdmin(permissions.BasePermission):
    """
    Permission to only allow HR staff or admins
    """
    def has_permission(self, request, view):
        # Allow if user is admin
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        # Allow if user is HR
        if hasattr(request.user, 'is_hr') and request.user.is_hr:
            return True
        
        return False


class IsManagerOrHROrAdmin(permissions.BasePermission):
    """
    Permission to only allow managers, HR staff, or admins
    """
    def has_permission(self, request, view):
        # Allow if user is admin
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        # Allow if user is HR
        if hasattr(request.user, 'is_hr') and request.user.is_hr:
            return True
        
        # Allow if user is a manager
        if hasattr(request.user, 'is_manager') and request.user.is_manager:
            return True
        
        return False


class IsOwnerOrManagerOrHROrAdmin(permissions.BasePermission):
    """
    Permission to only allow owners, their managers, HR staff, or admins
    """
    def has_object_permission(self, request, view, obj):
        # Allow if user is admin
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        # Allow if user is HR
        if hasattr(request.user, 'is_hr') and request.user.is_hr:
            return True
        
        # Allow if user is the owner
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        
        # Allow if user is the manager of the owner
        if (hasattr(request.user, 'is_manager') and request.user.is_manager and
            hasattr(obj, 'user') and hasattr(obj.user, 'manager') and obj.user.manager == request.user):
            return True
        
        return False
