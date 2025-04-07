from rest_framework import permissions

class IsStudent(permissions.BasePermission):
    """
    Permission pour autoriser uniquement les étudiants.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

class IsAdvisor(permissions.BasePermission):
    """
    Permission pour autoriser uniquement les conseillers.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'advisor'

class IsAdmin(permissions.BasePermission):
    """
    Permission pour autoriser uniquement les administrateurs.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsOwnerOrStaff(permissions.BasePermission):
    """
    Permission pour autoriser uniquement le propriétaire du profil ou le personnel.
    """
    def has_object_permission(self, request, view, obj):
        # Vérifier si l'utilisateur est le propriétaire ou un membre du personnel
        return obj.user == request.user or request.user.is_staff
