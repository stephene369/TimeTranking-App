from rest_framework import permissions

class IsAdminOrSelf(permissions.BasePermission):
    """
    Permission to only allow users to edit their own data or admins to edit any data
    """
    def has_object_permission(self, request, view, obj):
        # Check if the object being accessed is the user themselves
        if hasattr(obj, 'user'):
            return obj.user == request.user or request.user.is_admin
        return obj == request.user or request.user.is_admin


class IsManagerOrAdminOrSelf(permissions.BasePermission):
    """
    Permission to allow:
    - Users to access their own data
    - Managers to access their team members' data
    - Admins to access any data
    """
    def has_object_permission(self, request, view, obj):
        user = request.user
        
        # Admin can do anything
        if user.is_admin or user.is_hr:
            return True
        
        # Check if the object being accessed is the user themselves
        if hasattr(obj, 'user'):
            target_user = obj.user
        else:
            target_user = obj
        
        # Users can access their own data
        if target_user == user:
            return True
        
        # Managers can access their team members' data
        if user.is_manager and hasattr(target_user, 'manager') and target_user.manager == user:
            return True
        
        return False
