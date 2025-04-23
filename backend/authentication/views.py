
from rest_framework import generics, status, permissions, views
from rest_framework.response import Response
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
    EmailVerificationSerializer,
    ChangePasswordSerializer,
    ProfileSerializer
)
from .models import User, Profile
from rest_framework_simplejwt.tokens import RefreshToken
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("Received registration data:", request.data) 
        user = request.data
        print(request.data)
        password_plain = user.get("password")
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        
        user_data = serializer.data
        user = User.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user=user).access_token
        
        current_site = request.get_host()
        current_site = "54.221.178.123"
        relativeLink = reverse("email-verify")
        protocol = 'https' if request.is_secure() else 'http'
        abs_urls = f"{protocol}://{current_site}{relativeLink}?token={str(token)}"
        
        # Préparer le corps de l'email
        email_body = (
            f"Hi {user.username},\n\n"
            f"Thank you for registering with our Time Management App. "
            f"Please use the link below to verify your email:\n\n"
            f"{abs_urls}\n\n"
            f"Your account details:\n"
            f"First Name: {user.first_name}\n"
            f"Last Name: {user.last_name}\n"
            f"Email: {user.email}\n"
            f"Role: {user.get_role_display()}\n"
            f"Password: {password_plain}\n\n"
            f"Please keep this information secure.\n\n"
            f"Best regards,\nThe Time Management App Team"
        )
        
        data = {
            "email_body": email_body,
            "email_subject": "Verify your email - Time Management App",
            "to_email": user.email,
        }
        
        Util.send_email(data)
        
        return Response(user_data, status=status.HTTP_201_CREATED)

class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer
    permission_classes = [AllowAny]
    
    token_param_config = openapi.Parameter(
        "token", in_=openapi.IN_QUERY, description="Token", type=openapi.TYPE_STRING
    )
    
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload["user_id"])
            
            if not user.is_verified:
                user.is_verified = True
                user.save()
            
            return Response(
                {"email": "Successfully activated"}, status=status.HTTP_200_OK
            )
        except jwt.ExpiredSignatureError:
            return Response(
                {"error": "Activation Link Expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except jwt.exceptions.DecodeError:
            return Response(
                {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class UpdateUserInfoView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        # Générer de nouveaux tokens après changement de mot de passe
        refresh_token = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Password changed successfully',
            'tokens': {
                'refresh': str(refresh_token),
                'access': str(refresh_token.access_token)
            }
        }, status=status.HTTP_200_OK)

class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

# Vues spécifiques aux rôles
class StudentListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Seuls les conseillers et les administrateurs peuvent voir la liste des étudiants
        user = self.request.user
        if user.role in ['advisor', 'admin']:
            return User.objects.filter(role='student')
        return User.objects.none()

class AdvisorListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Tout le monde peut voir la liste des conseillers
        return User.objects.filter(role='advisor')
