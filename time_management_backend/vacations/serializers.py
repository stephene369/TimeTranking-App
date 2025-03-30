from rest_framework import serializers
from django.utils import timezone
from django.db.models import Sum
from .models import (
    VacationType, 
    VacationPolicy, 
    VacationBalance, 
    VacationRequest, 
    VacationAdjustment,
    VacationAccrual
)

class VacationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacationType
        fields = '__all__'


class VacationPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = VacationPolicy
        fields = '__all__'


class VacationBalanceSerializer(serializers.ModelSerializer):
    vacation_type_name = serializers.CharField(source='vacation_type.name', read_only=True)
    policy_name = serializers.CharField(source='policy.name', read_only=True)
    
    class Meta:
        model = VacationBalance
        fields = '__all__'
        read_only_fields = ('balance', 'last_accrual_date', 'user')


class VacationRequestSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    vacation_type_name = serializers.CharField(source='vacation_type.name', read_only=True)
    approver_name = serializers.CharField(source='approver.get_full_name', read_only=True)
    duration_days = serializers.FloatField(read_only=True)
    
    class Meta:
        model = VacationRequest
        fields = '__all__'
        read_only_fields = ('status', 'approver', 'approval_date', 'created_at', 'updated_at')
    
    def validate(self, data):
        """
        Validate vacation request
        """
        # Check that end_date is after start_date
        if data.get('end_date') < data.get('start_date'):
            raise serializers.ValidationError("End date must be after start date")
        
        # Check for overlapping requests
        user = self.context['request'].user
        overlapping = VacationRequest.objects.filter(
            user=user,
            status__in=['pending', 'approved'],
            start_date__lte=data.get('end_date'),
            end_date__gte=data.get('start_date')
        )
        
        # Exclude current instance in case of update
        if self.instance:
            overlapping = overlapping.exclude(pk=self.instance.pk)
        
        if overlapping.exists():
            raise serializers.ValidationError("This request overlaps with an existing request")
        
        # Check if user has enough balance
        if data.get('vacation_type').counts_against_balance:
            try:
                balance = VacationBalance.objects.get(
                    user=user,
                    vacation_type=data.get('vacation_type'),
                    year=timezone.now().year
                )
                
                if balance.balance < data.get('hours_requested'):
                    raise serializers.ValidationError(
                        f"Insufficient balance. You have {balance.balance} hours available."
                    )
            except VacationBalance.DoesNotExist:
                raise serializers.ValidationError("No vacation balance found for this type")
        
        return data
    
    def create(self, validated_data):
        # Set the user to the current user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class VacationApprovalSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=['approved', 'rejected'])
    notes = serializers.CharField(required=False, allow_blank=True)
    
    def validate(self, data):
        """
        Validate approval data
        """
        request_id = self.context.get('request_id')
        if not request_id:
            raise serializers.ValidationError("Vacation request ID is required")
        
        try:
            vacation_request = VacationRequest.objects.get(pk=request_id)
        except VacationRequest.DoesNotExist:
            raise serializers.ValidationError("Vacation request not found")
        
        # Check if request is already processed
        if vacation_request.status != 'pending':
            raise serializers.ValidationError(f"This request is already {vacation_request.status}")
        
        return data
    
    def save(self):
        request_id = self.context.get('request_id')
        vacation_request = VacationRequest.objects.get(pk=request_id)
        
        # Update request status
        vacation_request.status = self.validated_data['status']
        vacation_request.approval_notes = self.validated_data.get('notes', '')
        vacation_request.approver = self.context['request'].user
        vacation_request.approval_date = timezone.now()
        vacation_request.save()
        
        # If approved, update the user's vacation balance
        if self.validated_data['status'] == 'approved' and vacation_request.vacation_type.counts_against_balance:
            balance, created = VacationBalance.objects.get_or_create(
                user=vacation_request.user,
                vacation_type=vacation_request.vacation_type,
                year=timezone.now().year
            )
            
            balance.used += vacation_request.hours_requested
            balance.save()
        
        return vacation_request


class VacationAdjustmentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    vacation_type_name = serializers.CharField(source='vacation_type.name', read_only=True)
    adjusted_by_name = serializers.CharField(source='adjusted_by.get_full_name', read_only=True)
    
    class Meta:
        model = VacationAdjustment
        fields = '__all__'
        read_only_fields = ('adjusted_by', 'created_at')
    
    def create(self, validated_data):
        # Set the adjusted_by to the current user
        validated_data['adjusted_by'] = self.context['request'].user
        return super().create(validated_data)


class VacationAccrualSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    vacation_type_name = serializers.CharField(source='vacation_type.name', read_only=True)
    
    class Meta:
        model = VacationAccrual
        fields = '__all__'
        read_only_fields = ('created_at',)


class VacationCalendarSerializer(serializers.Serializer):
    """
    Serializer for vacation calendar view
    """
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    user_id = serializers.IntegerField(required=False)
    department_id = serializers.IntegerField(required=False)
    
    def validate(self, data):
        """
        Validate calendar parameters
        """
        if data['end_date'] < data['start_date']:
            raise serializers.ValidationError("End date must be after start date")
        
        # Limit date range to prevent performance issues
        date_diff = (data['end_date'] - data['start_date']).days
        if date_diff > 366:  # Max 1 year
            raise serializers.ValidationError("Date range cannot exceed 1 year")
        
        return data
    
    def get_calendar_data(self):
        """
        Get vacation calendar data
        """
        data = self.validated_data
        
        # Base queryset
        queryset = VacationRequest.objects.filter(
            status='approved',
            start_date__lte=data['end_date'],
            end_date__gte=data['start_date']
        ).select_related('user', 'vacation_type')
        
        # Apply filters
        if 'user_id' in data:
            queryset = queryset.filter(user_id=data['user_id'])
        
        if 'department_id' in data:
            queryset = queryset.filter(user__department_id=data['department_id'])
        
        # Format results for calendar view
        results = []
        for request in queryset:
            results.append({
                'id': request.id,
                'title': f"{request.user.get_full_name() or request.user.username} - {request.vacation_type.name}",
                'start': request.start_date.isoformat(),
                'end': (request.end_date + timezone.timedelta(days=1)).isoformat(),  # End date is inclusive
                'color': request.vacation_type.color,
                'user_id': request.user.id,
                'user_name': request.user.get_full_name() or request.user.username,
                'vacation_type': request.vacation_type.name,
                'half_day_start': request.start_half_day,
                'half_day_end': request.end_half_day,
                'hours': float(request.hours_requested)
            })
        
        return results
