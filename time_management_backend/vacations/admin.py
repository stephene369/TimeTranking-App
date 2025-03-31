from django.contrib import admin
from .models import (
    VacationType, 
    VacationPolicy, 
    VacationBalance, 
    VacationRequest, 
    VacationAdjustment,
    VacationAccrual
)

@admin.register(VacationType)
class VacationTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'requires_approval', 'counts_against_balance', 'is_active')
    list_filter = ('requires_approval', 'counts_against_balance', 'is_active')
    search_fields = ('name', 'description')

@admin.register(VacationPolicy)
class VacationPolicyAdmin(admin.ModelAdmin):
    list_display = ('name', 'accrual_rate', 'accrual_frequency', 'max_accrual', 'max_carryover', 'is_active')
    list_filter = ('accrual_frequency', 'is_active')
    search_fields = ('name', 'description')

@admin.register(VacationBalance)
class VacationBalanceAdmin(admin.ModelAdmin):
    list_display = ('user', 'vacation_type', 'year', 'balance', 'initial_balance', 'accrued', 'used', 'adjusted')
    list_filter = ('vacation_type', 'year')
    search_fields = ('user__username', 'user__email', 'user__first_name', 'user__last_name')
    date_hierarchy = 'last_accrual_date'

@admin.register(VacationRequest)
class VacationRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'vacation_type', 'start_date', 'end_date', 'hours_requested', 'status', 'created_at')
    list_filter = ('status', 'vacation_type', 'start_date')
    search_fields = ('user__username', 'user__email', 'reason', 'notes')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at', 'updated_at')

@admin.register(VacationAdjustment)
class VacationAdjustmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'vacation_type', 'hours', 'adjusted_by', 'created_at')
    list_filter = ('vacation_type', 'created_at')
    search_fields = ('user__username', 'user__email', 'reason')
    date_hierarchy = 'created_at'
    readonly_fields = ('created_at',)

@admin.register(VacationAccrual)
class VacationAccrualAdmin(admin.ModelAdmin):
    list_display = ('user', 'vacation_type', 'hours', 'accrual_date', 'period_start', 'period_end')
    list_filter = ('vacation_type', 'accrual_date')
    search_fields = ('user__username', 'user__email')
    date_hierarchy = 'accrual_date'
    readonly_fields = ('created_at',)
