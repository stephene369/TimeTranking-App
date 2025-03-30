from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserProfile, UserPreferences

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ('user',)


class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        exclude = ('user',)


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    preferences = UserPreferencesSerializer(required=False)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 
                  'role', 'employee_id', 'department', 'job_title', 
                  'manager', 'is_active', 'date_joined', 'profile', 'preferences')
        read_only_fields = ('id', 'date_joined', 'is_active')
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        preferences_data = validated_data.pop('preferences', {})
        
        # Create user
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        
        # Create profile
        UserProfile.objects.create(user=user, **profile_data)
        
        # Create preferences
        UserPreferences.objects.create(user=user, **preferences_data)
        
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        preferences_data = validated_data.pop('preferences', None)
        
        # Update user
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update profile if provided
        if profile_data and hasattr(instance, 'profile'):
            for attr, value in profile_data.items():
                setattr(instance.profile, attr, value)
            instance.profile.save()
        
        # Update preferences if provided
        if preferences_data and hasattr(instance, 'preferences'):
            for attr, value in preferences_data.items():
                setattr(instance.preferences, attr, value)
            instance.preferences.save()
        
        return instance


class UserListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing users"""
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name', 'role', 'department', 'job_title')
    
    def get_full_name(self, obj):
        return obj.get_full_name()


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True, min_length=8)
    
    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("New passwords don't match")
        return data
