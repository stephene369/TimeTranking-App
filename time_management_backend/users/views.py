from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import UserProfile, UserPreferences
from .serializers import (
    UserSerializer, 
    UserListSerializer, 
    UserProfileSerializer, 
    UserPreferencesSerializer,
    PasswordChangeSerializer
)
from .permissions import IsAdminOrSelf, IsManagerOrAdminOrSelf

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsManagerOrAdminOrSelf]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UserListSerializer
        return UserSerializer
    
    def get_queryset(self):
        user = self.request.user
        
        # System admins and HR admins can see all users
        if user.is_admin or user.is_hr:
            return User.objects.all()
        
        # Managers can see themselves and their team members
        if user.is_manager:
            return User.objects.filter(
                models.Q(id=user.id) | models.Q(manager=user)
            )
        
        # Regular employees and coaches can only see themselves
        return User.objects.filter(id=user.id)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user information"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def change_password(self, request):
        """Change user password"""
        serializer = PasswordChangeSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response(
                    {"old_password": ["Wrong password."]}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"status": "password changed"})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint for user profiles
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]
    
    def get_queryset(self):
        user = self.request.user
        
        # System admins and HR admins can see all profiles
        if user.is_admin or user.is_hr:
            return UserProfile.objects.all()
        
        # Managers can see their team members' profiles
        if user.is_manager:
            team_user_ids = user.team_members.values_list('id', flat=True)
            return UserProfile.objects.filter(
                models.Q(user=user) | models.Q(user_id__in=team_user_ids)
            )
        
        # Regular employees and coaches can only see their own profile
        return UserProfile.objects.filter(user=user)


class UserPreferencesViewSet(viewsets.ModelViewSet):
    """
    API endpoint for user preferences
    """
    queryset = UserPreferences.objects.all()
    serializer_class = UserPreferencesSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]
    
    def get_queryset(self):
        # Users can only see and edit their own preferences
        return UserPreferences.objects.filter(user=self.request.user)
