from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'tasks', views.TaskViewSet)
router.register(r'entries', views.TimeEntryViewSet)
router.register(r'settings', views.TimeTrackingSettingsViewSet)
router.register(r'summary', views.TimeSummaryViewSet, basename='summary')

urlpatterns = [
    path('', include(router.urls)),
]
