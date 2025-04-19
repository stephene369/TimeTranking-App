from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenRefreshView
from django.http import JsonResponse


# Optional: a simple view to return API status at /api/
def api_root(request):
    return JsonResponse({'status': 'API is alive'})


# Swagger schema setup
schema_view = get_schema_view(
   openapi.Info(
      title="Time Management API",
      default_version='v1',
      description="API for Time Management Application",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@timemanagement.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # ✅ This handles GET /api/
    path('api/', api_root),

    # Auth routes
    path('api/auth/', include('authentication.urls')),

    # JWT token refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Task-related routes
    path('api/tasks/', include('tasks.urls')),

    # Swagger + Redoc docs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('api/tasks/', include('tasks.urls')),
]


# ✅ Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
