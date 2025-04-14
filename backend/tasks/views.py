from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from .models import Task, Subtask, Category
from .serializers import TaskSerializer, SubtaskSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Category.objects.all()

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    
    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user)
        
        # Apply filters
        status_filter = self.request.query_params.get('status')
        if status_filter:
            if status_filter == 'completed':
                queryset = queryset.filter(completed=True)
            elif status_filter == 'active':
                queryset = queryset.filter(completed=False)
        
        category_filter = self.request.query_params.get('category')
        if category_filter:
            queryset = queryset.filter(category__name=category_filter)
        
        priority_filter = self.request.query_params.get('priority')
        if priority_filter:
            queryset = queryset.filter(priority=priority_filter)
            
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    # Assurez-vous que cette méthode est correctement définie
    def create(self, request, *args, **kwargs):
        print("Creating task with data:", request.data)  # Ajoutez ceci pour le débogage
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=True, methods=['patch'])
    def toggle_completion(self, request, pk=None):
        task = self.get_object()
        task.completed = not task.completed
        task.save()
        return Response({'status': 'task completion toggled'})
    
    @action(detail=True, methods=['get', 'post'])
    def subtasks(self, request, pk=None):
        task = self.get_object()
        
        if request.method == 'GET':
            subtasks = task.subtasks.all()
            serializer = SubtaskSerializer(subtasks, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = SubtaskSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(task=task)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubtaskViewSet(viewsets.ModelViewSet):
    serializer_class = SubtaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Subtask.objects.filter(task__user=user)
    
    @action(detail=True, methods=['patch'])
    def toggle_completion(self, request, pk=None):
        subtask = self.get_object()
        subtask.completed = not subtask.completed
        subtask.save()
        return Response({'status': 'subtask completion toggled'})






from rest_framework.views import APIView

class TaskCreateAPIView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
