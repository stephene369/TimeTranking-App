from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenRefreshView


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
    path('api/auth/', include('authentication.urls')),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Autres URLs de votre projet
    # Documentation Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/tasks/', include('tasks.urls')),
]

# Ajouter cette configuration pour servir les fichiers média en développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
