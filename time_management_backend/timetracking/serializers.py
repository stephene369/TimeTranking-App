from rest_framework import serializers
from django.utils import timezone
from django.db.models import Sum, F, ExpressionWrapper, fields
from django.db.models.functions import Extract
from .models import Project, Task, TimeEntry, TimeTrackingSettings

class ProjectSerializer(serializers.ModelSerializer):
    total_tracked_hours = serializers.SerializerMethodField()
    budget_remaining = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    
    def get_total_tracked_hours(self, obj):
        return obj.total_tracked_hours
    
    def get_budget_remaining(self, obj):
        return obj.budget_remaining


class TaskSerializer(serializers.ModelSerializer):
    total_tracked_hours = serializers.SerializerMethodField()
    is_overdue = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
    
    def get_total_tracked_hours(self, obj):
        return obj.total_tracked_hours
    
    def get_is_overdue(self, obj):
        return obj.is_overdue


class TimeEntrySerializer(serializers.ModelSerializer):
    duration_seconds = serializers.SerializerMethodField()
    duration_formatted = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    project_name = serializers.SerializerMethodField()
    task_name = serializers.SerializerMethodField()
    
    class Meta:
        model = TimeEntry
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'duration_seconds', 'duration_formatted')
    
    def get_duration_seconds(self, obj):
        return obj.duration_seconds
    
    def get_duration_formatted(self, obj):
        return obj.duration_formatted
    
    def get_user_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
    
    def get_project_name(self, obj):
        return obj.project.name
    
    def get_task_name(self, obj):
        return obj.task.name if obj.task else None
    
    def validate(self, data):
        """
        Validate time entry data
        """
        # Check that end_time is after start_time
        if 'end_time' in data and data.get('start_time') and data['end_time'] < data['start_time']:
            raise serializers.ValidationError("End time must be after start time")
        
        # Check that task belongs to the selected project
        if 'task' in data and 'project' in data and data['task'] and data['task'].project != data['project']:
            raise serializers.ValidationError("Task must belong to the selected project")
        
        return data


class TimeTrackingSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTrackingSettings
        fields = '__all__'
        read_only_fields = ('user',)


class TimeSummarySerializer(serializers.Serializer):
    """
    Serializer for time summary reports
    """
    # Date range
    start_date = serializers.DateField(required=True)
    end_date = serializers.DateField(required=True)
    
    # Grouping options
    group_by = serializers.ChoiceField(
        choices=['day', 'week', 'month', 'project', 'task', 'user'],
        default='day'
    )
    
    # Filtering options
    project_id = serializers.IntegerField(required=False)
    task_id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField(required=False)
    is_billable = serializers.BooleanField(required=False)
    
    def validate(self, data):
        """
        Validate summary parameters
        """
        if data['end_date'] < data['start_date']:
            raise serializers.ValidationError("End date must be after start date")
        
        # Limit date range to prevent performance issues
        date_diff = (data['end_date'] - data['start_date']).days
        if date_diff > 366:  # Max 1 year
            raise serializers.ValidationError("Date range cannot exceed 1 year")
        
        return data
    
    def get_summary(self):
        """
        Generate time summary based on parameters
        """
        data = self.validated_data
        
        # Base queryset
        queryset = TimeEntry.objects.filter(
            start_time__date__gte=data['start_date'],
            start_time__date__lte=data['end_date']
        )
        
        # Apply filters
        if 'project_id' in data:
            queryset = queryset.filter(project_id=data['project_id'])
        
        if 'task_id' in data:
            queryset = queryset.filter(task_id=data['task_id'])
        
        if 'user_id' in data:
            queryset = queryset.filter(user_id=data['user_id'])
        
        if 'is_billable' in data:
            queryset = queryset.filter(is_billable=data['is_billable'])
        
        # Group by selected option
        group_by = data['group_by']
        
        if group_by == 'day':
            # Group by day
            results = self._group_by_day(queryset)
        elif group_by == 'week':
            # Group by week
            results = self._group_by_week(queryset)
        elif group_by == 'month':
            # Group by month
            results = self._group_by_month(queryset)
        elif group_by == 'project':
            # Group by project
            results = self._group_by_project(queryset)
        elif group_by == 'task':
            # Group by task
            results = self._group_by_task(queryset)
        elif group_by == 'user':
            # Group by user
            results = self._group_by_user(queryset)
        
        return {
            'start_date': data['start_date'],
            'end_date': data['end_date'],
            'group_by': group_by,
            'results': results
        }
    
    def _group_by_day(self, queryset):
        """Group time entries by day"""
        queryset = queryset.annotate(
            day=ExpressionWrapper(
                Extract('start_time', 'day'), output_field=fields.IntegerField()
            ),
            month=ExpressionWrapper(
                Extract('start_time', 'month'), output_field=fields.IntegerField()
            ),
            year=ExpressionWrapper(
                Extract('start_time', 'year'), output_field=fields.IntegerField()
            )
        ).values('year', 'month', 'day')
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            date_str = f"{item['year']}-{item['month']:02d}-{item['day']:02d}"
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            
            results.append({
                'date': date_str,
                'total_hours': round(total_hours, 2)
            })
        
        return results
    
    def _group_by_week(self, queryset):
        """Group time entries by week"""
        queryset = queryset.annotate(
            week=ExpressionWrapper(
                Extract('start_time', 'week'), output_field=fields.IntegerField()
            ),
            year=ExpressionWrapper(
                Extract('start_time', 'year'), output_field=fields.IntegerField()
            )
        ).values('year', 'week')
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            week_str = f"{item['year']}-W{item['week']:02d}"
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            
            results.append({
                'week': week_str,
                'total_hours': round(total_hours, 2)
            })
        
        return results
    
    def _group_by_month(self, queryset):
        """Group time entries by month"""
        queryset = queryset.annotate(
            month=ExpressionWrapper(
                Extract('start_time', 'month'), output_field=fields.IntegerField()
            ),
            year=ExpressionWrapper(
                Extract('start_time', 'year'), output_field=fields.IntegerField()
            )
        ).values('year', 'month')
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            month_str = f"{item['year']}-{item['month']:02d}"
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            
            results.append({
                'month': month_str,
                'total_hours': round(total_hours, 2)
            })
        
        return results
    
    def _group_by_project(self, queryset):
        """Group time entries by project"""
        queryset = queryset.values('project', 'project__name')
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            
            results.append({
                'project_id': item['project'],
                'project_name': item['project__name'],
                'total_hours': round(total_hours, 2)
            })
        
        return results
    
    def _group_by_task(self, queryset):
        """Group time entries by task"""
        queryset = queryset.filter(task__isnull=False).values(
            'task', 'task__name', 'project', 'project__name'
        )
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            
            results.append({
                'task_id': item['task'],
                'task_name': item['task__name'],
                'project_id': item['project'],
                'project_name': item['project__name'],
                'total_hours': round(total_hours, 2)
            })
        
        return results
    
    def _group_by_user(self, queryset):
        """Group time entries by user"""
        queryset = queryset.values(
            'user', 'user__username', 'user__first_name', 'user__last_name'
        )
        
        # Calculate total duration
        queryset = queryset.annotate(
            total_seconds=Sum(
                ExpressionWrapper(
                    F('end_time') - F('start_time'),
                    output_field=fields.DurationField()
                )
            )
        )
        
        # Format results
        results = []
        for item in queryset:
            total_hours = item['total_seconds'].total_seconds() / 3600 if item['total_seconds'] else 0
            full_name = f"{item['user__first_name']} {item['user__last_name']}".strip()
            
            results.append({
                'user_id': item['user'],
                'username': item['user__username'],
                'full_name': full_name or item['user__username'],
                'total_hours': round(total_hours, 2)
            })
        
        return results
