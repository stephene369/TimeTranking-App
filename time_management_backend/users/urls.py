from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import auth_views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'profiles', views.UserProfileViewSet)
router.register(r'preferences', views.UserPreferencesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Authentication endpoints
    path('auth/login/', auth_views.LoginView.as_view(), name='login'),
    path('auth/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('auth/password/reset/', auth_views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('auth/password/reset/confirm/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]


"""


### User Management
- `GET /api/users/` - List users (filtered by permissions)
- `POST /api/users/` - Create new user
- `GET /api/users/{id}/` - Retrieve specific user
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user
- `GET /api/users/me/` - Get current user information

### Profile Management
- `GET /api/profiles/` - List profiles (filtered by permissions)
- `GET /api/profiles/{id}/` - Retrieve specific profile
- `PUT /api/profiles/{id}/` - Update profile

### Preferences Management
- `GET /api/preferences/` - List preferences (filtered by permissions)
- `GET /api/preferences/{id}/` - Retrieve specific preferences
- `PUT /api/preferences/{id}/` - Update preferences

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/password/reset/` - Password reset request
- `POST /api/auth/password/reset/confirm/` - Confirm password reset

## Permissions

The app implements custom permissions to ensure users can only access data they're authorized to see:

- **IsAdminOrSelf**: Allows users to edit their own data or admins to edit any data
- **IsManagerOrAdminOrSelf**: Allows users to access their own data, managers to access their team members' data, and admins to access any data


"""