from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from rest_framework.authentication import TokenAuthentication

User = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Authentication backend that allows login with either username or email
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None
        
        # Try to find a user matching the username
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            # Try with email instead
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                # Run the default password hasher once to reduce timing
                # attacks targeting a particular user
                User().set_password(password)
                return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        
        return None


class BearerTokenAuthentication(TokenAuthentication):
    """
    Simple token based authentication using the keyword Bearer instead of Token
    """
    keyword = 'Bearer'
