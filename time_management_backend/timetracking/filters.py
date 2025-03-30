import django_filters
from django.db.models import Q
from .models import TimeEntry

class TimeEntryFilter(django_filters.FilterSet):
    """
    Filter for time entries
    """
    start_date = django_filters.DateFilter(field_name='start_time', lookup_expr='date__gte')
    end_date = django_filters.DateFilter(field_name='start_time', lookup_expr='date__lte')
    min_duration = django_filters.NumberFilter(method='filter_min_duration')
    max_duration = django_filters.NumberFilter(method='filter_max_duration')
    is_running = django_filters.BooleanFilter(field_name='is_running')
    
    class Meta:
        model = TimeEntry
        fields = [
            'user', 'project', 'task', 'is_billable', 
            'start_date', 'end_date', 'is_running'
        ]
    
    def filter_min_duration(self, queryset, name, value):
        """Filter by minimum duration in minutes"""
        # Convert minutes to seconds
        min_seconds = value * 60
        
        # Filter entries with manual duration
        manual_duration_q = Q(manual_duration__gte=min_seconds)
        
        # Filter entries with start and end time
        start_end_q = Q(
            end_time__isnull=False,
            end_time__gte=models.F('start_time') + timezone.timedelta(seconds=min_seconds)
        )
        
        return queryset.filter(manual_duration_q | start_end_q)
    
    def filter_max_duration(self, queryset, name, value):
        """Filter by maximum duration in minutes"""
        # Convert minutes to seconds
        max_seconds = value * 60
        
        # Filter entries with manual duration
        manual_duration_q = Q(manual_duration__lte=max_seconds)
        
        # Filter entries with start and end time
        start_end_q = Q(
            end_time__isnull=False,
            end_time__lte=models.F('start_time') + timezone.timedelta(seconds=max_seconds)
        )
        
        return queryset.filter(manual_duration_q | start_end_q)
