from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Task, TimeEntry, TimeTrackingSettings
from .serializers import (
    ProjectSerializer, 
    TaskSerializer, 
    TimeEntrySerializer, 
    TimeTrackingSettingsSerializer,
    TimeSummarySerializer
)
from .permissions import IsProjectMemberOrAdmin, IsTimeEntryOwnerOrAdmin
from .filters import TimeEntryFilter

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint for projects
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsProjectMemberOrAdmin]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description', 'client']
    filterset_fields = ['is_active', 'manager']
    
    def get_queryset(self):
        """
        Filter projects based on user permissions
        """
        user = self.request.user
        
        # Admin users can see all projects
        if user.is_staff or user.is_superuser:
            return Project.objects.all()
        
        # Managers can see projects they manage
        if user.role == 'manager':
            return Project.objects.filter(
                Q(manager=user) | Q(members=user)
            ).distinct()
        
        # Regular users can only see projects they are members of
        return Project.objects.filter(members=user)
    
    @action(detail=True, methods=['get'])
    def tasks(self, request, pk=None):
        """
        Get all tasks for a specific project
        """
        project = self.get_object()
        tasks = Task.objects.filter(project=project)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def time_entries(self, request, pk=None):
        """
        Get all time entries for a specific project
        """
        project = self.get_object()
        time_entries = TimeEntry.objects.filter(project=project)
        serializer = TimeEntrySerializer(time_entries, many=True)
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    """
    API endpoint for tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsProjectMemberOrAdmin]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['project', 'is_completed', 'assignees']
    
    def get_queryset(self):
        """
        Filter tasks based on user permissions
        """
        user = self.request.user
        
        # Admin users can see all tasks
        if user.is_staff or user.is_superuser:
            return Task.objects.all()
        
        # Managers can see tasks for projects they manage
        if user.role == 'manager':
            return Task.objects.filter(
                Q(project__manager=user) | Q(assignees=user) | Q(project__members=user)
            ).distinct()
        
        # Regular users can only see tasks for projects they are members of
        # or tasks assigned to them
        return Task.objects.filter(
            Q(project__members=user) | Q(assignees=user)
        ).distinct()
    
    @action(detail=True, methods=['get'])
    def time_entries(self, request, pk=None):
        """
        Get all time entries for a specific task
        """
        task = self.get_object()
        time_entries = TimeEntry.objects.filter(task=task)
        serializer = TimeEntrySerializer(time_entries, many=True)
        return Response(serializer.data)


class TimeEntryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for time entries
    """
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    permission_classes = [permissions.IsAuthenticated, IsTimeEntryOwnerOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = TimeEntryFilter
    search_fields = ['description', 'project__name', 'task__name']
    ordering_fields = ['start_time', 'end_time', 'created_at', 'updated_at']
    ordering = ['-start_time']
    
    def get_queryset(self):
        """
        Filter time entries based on user permissions
        """
        user = self.request.user
        
        # Admin users can see all time entries
        if user.is_staff or user.is_superuser:
            return TimeEntry.objects.all()
        
        # Managers can see time entries for their team members
        if user.role == 'manager':
            return TimeEntry.objects.filter(
                Q(user=user) | Q(user__manager=user) | Q(project__manager=user)
            ).distinct()
        
        # Regular users can only see their own time entries
        return TimeEntry.objects.filter(user=user)
    
    def perform_create(self, serializer):
        """
        Set the current user as the owner of the time entry
        """
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def start_timer(self, request):
        """
        Start a new timer for the current user
        """
        # Check if user already has a running timer
        running_entry = TimeEntry.objects.filter(user=request.user, is_running=True).first()
        if running_entry:
            return Response(
                {"detail": "You already have a running timer. Please stop it before starting a new one."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a new time entry
        data = request.data.copy()
        data['user'] = request.user.id
        data['start_time'] = timezone.now()
        data['is_running'] = True
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def stop_timer(self, request, pk=None):
        """
        Stop a running timer
        """
        time_entry = self.get_object()
        
        if not time_entry.is_running:
            return Response(
                {"detail": "This time entry is not currently running."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        time_entry.end_time = timezone.now()
        time_entry.is_running = False
        time_entry.save()
        
        serializer = self.get_serializer(time_entry)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def current(self, request):
        """
        Get the current running timer for the user
        """
        running_entry = TimeEntry.objects.filter(user=request.user, is_running=True).first()
        
        if not running_entry:
            return Response(
                {"detail": "No running timer found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.get_serializer(running_entry)
        return Response(serializer.data)


class TimeTrackingSettingsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for time tracking settings
    """
    queryset = TimeTrackingSettings.objects.all()
    serializer_class = TimeTrackingSettingsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """
        Users can only see their own settings
        """
        return TimeTrackingSettings.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """
        Set the current user as the owner of the settings
        """
        serializer.save(user=self.request.user)


class TimeSummaryViewSet(viewsets.ViewSet):
    """
    API endpoint for time summary reports
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request):
        """
        Generate a time summary report
        """
        serializer = TimeSummarySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        summary = serializer.get_summary()
        return Response(summary)
