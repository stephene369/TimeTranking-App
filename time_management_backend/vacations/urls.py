from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'types', views.VacationTypeViewSet)
router.register(r'policies', views.VacationPolicyViewSet)
router.register(r'balance', views.VacationBalanceViewSet)
router.register(r'requests', views.VacationRequestViewSet)
router.register(r'adjustments', views.VacationAdjustmentViewSet)
router.register(r'accruals', views.VacationAccrualViewSet)
router.register(r'calendar', views.VacationCalendarViewSet, basename='calendar')

urlpatterns = [
    path('', include(router.urls)),
]
