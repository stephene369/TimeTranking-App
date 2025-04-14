from rest_framework import serializers
from .models import Task, Subtask, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color']

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ['id', 'title', 'completed']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'due_date', 'priority', 
            'category', 'category_name', 'completed', 'reminder', 
            'tags', 'subtasks', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
    
    def create(self, validated_data):
        # Extract subtasks data if present
        subtasks_data = self.context.get('subtasks', [])
        
        # Create the task
        task = Task.objects.create(**validated_data)
        
        # Create subtasks
        for subtask_data in subtasks_data:
            Subtask.objects.create(task=task, **subtask_data)
            
        return task
