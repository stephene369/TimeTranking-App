from django.urls import path
from .views import (
    RegisterView, VerifyEmail, LoginView, LogoutView,
    UserProfileView, UpdateUserInfoView, ChangePasswordView,
    ProfileDetailView, ProfileUpdateView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', UpdateUserInfoView.as_view(), name='update-user-info'),
    path('profile/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/details/', ProfileDetailView.as_view(), name='profile-details'),
    path('profile/details/update/', ProfileUpdateView.as_view(), name='update-profile-details'),
]
