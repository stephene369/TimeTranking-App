from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import User, Profile
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=128, min_length=6, write_only=True, required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name', 'role']
    
    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        
        if not username.isalnum():
            raise serializers.ValidationError('Username should only contain alphanumeric characters')
        
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class EmailVerificationSerializer(serializers.Serializer):
    token = serializers.CharField(max_length=555)
    
    class Meta:
        fields = ['token']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, required=True)
    password = serializers.CharField(
        max_length=128, write_only=True, required=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        user = authenticate(email=email, password=password)
        
        if not user:
            raise serializers.ValidationError('Invalid credentials, try again')
        
        if not user.is_active:
            raise serializers.ValidationError('Account disabled, contact admin')
        
        if not user.is_verified:
            raise serializers.ValidationError('Email is not verified')
        
        refresh = RefreshToken.for_user(user)
        
        return {
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.role,
                'is_verified': user.is_verified,
            },
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'role', 'is_verified']
        read_only_fields = ['id', 'email', 'is_verified']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user_role = instance.user.role
        
        # Filtrer les champs en fonction du rôle
        if user_role == 'student':
            # Supprimer les champs spécifiques aux conseillers
            representation.pop('department', None)
            representation.pop('office_location', None)
            representation.pop('office_hours', None)
        elif user_role == 'advisor':
            # Supprimer les champs spécifiques aux étudiants
            representation.pop('student_id', None)
            representation.pop('major', None)
            representation.pop('graduation_year', None)
        
        return representation

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        max_length=128, write_only=True, required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        max_length=128, write_only=True, required=True,
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        max_length=128, write_only=True, required=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': "Password fields didn't match."})
        
        return attrs
    
    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is not correct')
        return value
    
    def validate_new_password(self, value):
        validate_password(value)
        return value

class ServerRegisterSerializer(serializers.Serializer):
    # Pour l'enregistrement côté serveur si nécessaire
    pass
