from rest_framework import status, views, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate, login, logout
from django.conf import settings

class LoginView(ObtainAuthToken):
    """
    Custom login view that returns user info along with token
    """
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        
        # Login the user in the Django session
        login(request, user)
        
        # Return token and user info
        from .serializers import UserSerializer
        user_serializer = UserSerializer(user)
        
        return Response({
            'token': token.key,
            'user': user_serializer.data
        })


class LogoutView(views.APIView):
    """
    Logout view that invalidates the token
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        # Delete the token
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            pass
        
        # Logout from the session
        logout(request)
        
        return Response({"detail": "Successfully logged out."}, 
                        status=status.HTTP_200_OK)


class PasswordResetRequestView(views.APIView):
    """
    Request a password reset
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        
        from django.contrib.auth.models import User
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes
        from django.core.mail import send_mail
        from django.template.loader import render_to_string
        
        user = User.objects.filter(email=email).first()
        
        if user:
            # Generate token and uid
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Build reset URL (frontend should handle this)
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
            
            # Send email
            subject = "Password Reset Request"
            message = render_to_string('password_reset_email.html', {
                'user': user,
                'reset_url': reset_url,
                'site_name': settings.SITE_NAME,
            })
            
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        
        # Always return success to prevent email enumeration
        return Response({"detail": "Password reset email has been sent if the email exists."})


class PasswordResetConfirmView(views.APIView):
    """
    Confirm password reset with token
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        from django.contrib.auth.models import User
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_decode
        from django.utils.encoding import force_str
        
        uid = request.data.get('uid', '')
        token = request.data.get('token', '')
        new_password = request.data.get('new_password', '')
        
        try:
            # Decode the UID to get the user
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
            
            # Check if the token is valid
            if default_token_generator.check_token(user, token):
                user.set_password(new_password)
                user.save()
                return Response({"detail": "Password has been reset successfully."})
            else:
                return Response({"detail": "Invalid token."}, 
                                status=status.HTTP_400_BAD_REQUEST)
                
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"detail": "Invalid reset link."}, 
                            status=status.HTTP_400_BAD_REQUEST)
