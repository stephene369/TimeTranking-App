from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    VacationType, 
    VacationPolicy, 
    VacationBalance, 
    VacationRequest, 
    VacationAdjustment,
    VacationAccrual
)
from .serializers import (
    VacationTypeSerializer,
    VacationPolicySerializer,
    VacationBalanceSerializer,
    VacationRequestSerializer,
    VacationApprovalSerializer,
    VacationAdjustmentSerializer,
    VacationAccrualSerializer,
    VacationCalendarSerializer
)
from .permissions import (
    IsHROrAdmin,
    IsManagerOrHROrAdmin,
    IsOwnerOrManagerOrHROrAdmin
)

class VacationTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation types
    """
    queryset = VacationType.objects.all()
    serializer_class = VacationTypeSerializer
    permission_classes = [permissions.IsAuthenticated, IsHROrAdmin]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['requires_approval', 'counts_against_balance', 'is_active']


class VacationPolicyViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation policies
    """
    queryset = VacationPolicy.objects.all()
    serializer_class = VacationPolicySerializer
    permission_classes = [permissions.IsAuthenticated, IsHROrAdmin]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['is_active', 'accrual_frequency']


class VacationBalanceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation balances
    """
    queryset = VacationBalance.objects.all()
    serializer_class = VacationBalanceSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrManagerOrHROrAdmin]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'vacation_type', 'year']
    
    def get_queryset(self):
        """
        Filter balances based on user permissions
        """
        user = self.request.user
        
        # Admin and HR users can see all balances
        if user.is_staff or user.is_superuser or hasattr(user, 'is_hr') and user.is_hr:
            return VacationBalance.objects.all()
        
        # Managers can see balances for their team members
        if hasattr(user, 'is_manager') and user.is_manager:
            return VacationBalance.objects.filter(
                Q(user=user) | Q(user__manager=user)
            ).distinct()
        
        # Regular users can only see their own balances
        return VacationBalance.objects.filter(user=user)
    
    @action(detail=False, methods=['get'])
    def my_balances(self, request):
        """
        Get current user's vacation balances
        """
        balances = VacationBalance.objects.filter(
            user=request.user,
            year=timezone.now().year
        )
        serializer = self.get_serializer(balances, many=True)
        return Response(serializer.data)


class VacationRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation requests
    """
    queryset = VacationRequest.objects.all()
    serializer_class = VacationRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrManagerOrHROrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['user', 'vacation_type', 'status', 'start_date', 'end_date']
    search_fields = ['reason', 'notes', 'approval_notes']
    ordering_fields = ['start_date', 'end_date', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Filter requests based on user permissions
        """
        user = self.request.user
        
        # Admin and HR users can see all requests
        if user.is_staff or user.is_superuser or hasattr(user, 'is_hr') and user.is_hr:
            return VacationRequest.objects.all()
        
        # Managers can see requests for their team members
        if hasattr(user, 'is_manager') and user.is_manager:
            return VacationRequest.objects.filter(
                Q(user=user) | Q(user__manager=user)
            ).distinct()
        
        # Regular users can only see their own requests
        return VacationRequest.objects.filter(user=user)
    
    @action(detail=False, methods=['get'])
    def my_requests(self, request):
        """
        Get current user's vacation requests
        """
        requests = VacationRequest.objects.filter(user=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def pending_approvals(self, request):
        """
        Get requests pending approval for the current user (as a manager)
        """
        user = request.user
        
        # Check if user is a manager, HR, or admin
        if not (user.is_staff or user.is_superuser or 
                hasattr(user, 'is_hr') and user.is_hr or 
                hasattr(user, 'is_manager') and user.is_manager):
            return Response(
                {"detail": "You don't have permission to approve requests."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get pending requests for team members
        if hasattr(user, 'is_manager') and user.is_manager:
            pending = VacationRequest.objects.filter(
                user__manager=user,
                status='pending'
            )
        else:
            # HR and admins can see all pending requests
            pending = VacationRequest.objects.filter(status='pending')
        
        serializer = self.get_serializer(pending, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """
        Approve a vacation request
        """
        vacation_request = self.get_object()
        
        # Check if user can approve this request
        user = request.user
        if not (user.is_staff or user.is_superuser or 
                hasattr(user, 'is_hr') and user.is_hr or 
                (hasattr(user, 'is_manager') and user.is_manager and 
                 vacation_request.user.manager == user)):
            return Response(
                {"detail": "You don't have permission to approve this request."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if request is already processed
        if vacation_request.status != 'pending':
            return Response(
                {"detail": f"This request is already {vacation_request.status}."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Process approval
        serializer = VacationApprovalSerializer(
            data={'status': 'approved', 'notes': request.data.get('notes', '')},
            context={'request': request, 'request_id': pk}
        )
        serializer.is_valid(raise_exception=True)
        vacation_request = serializer.save()
        
        return Response(VacationRequestSerializer(vacation_request).data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """
        Reject a vacation request
        """
        vacation_request = self.get_object()
        
        # Check if user can reject this request
        user = request.user
        if not (user.is_staff or user.is_superuser or 
                hasattr(user, 'is_hr') and user.is_hr or 
                (hasattr(user, 'is_manager') and user.is_manager and 
                 vacation_request.user.manager == user)):
            return Response(
                {"detail": "You don't have permission to reject this request."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if request is already processed
        if vacation_request.status != 'pending':
            return Response(
                {"detail": f"This request is already {vacation_request.status}."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Process rejection
        serializer = VacationApprovalSerializer(
            data={'status': 'rejected', 'notes': request.data.get('notes', '')},
            context={'request': request, 'request_id': pk}
        )
        serializer.is_valid(raise_exception=True)
        vacation_request = serializer.save()
        
        return Response(VacationRequestSerializer(vacation_request).data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """
        Cancel a vacation request
        """
        vacation_request = self.get_object()
        
        # Only the owner or admin can cancel a request
        if not (request.user == vacation_request.user or 
                request.user.is_staff or request.user.is_superuser):
            return Response(
                {"detail": "You don't have permission to cancel this request."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Check if request can be cancelled
        if vacation_request.status not in ['pending', 'approved']:
            return Response(
                {"detail": f"Cannot cancel a request with status '{vacation_request.status}'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # If the request was approved, restore the balance
        if vacation_request.status == 'approved' and vacation_request.vacation_type.counts_against_balance:
            balance = VacationBalance.objects.get(
                user=vacation_request.user,
                vacation_type=vacation_request.vacation_type,
                year=timezone.now().year
            )
            
            balance.used -= vacation_request.hours_requested
            balance.save()
        
        # Update request status
        vacation_request.status = 'cancelled'
        vacation_request.save()
        
        return Response(VacationRequestSerializer(vacation_request).data)


class VacationAdjustmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation balance adjustments
    """
    queryset = VacationAdjustment.objects.all()
    serializer_class = VacationAdjustmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsHROrAdmin]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'vacation_type']
    ordering_fields = ['created_at']
    ordering = ['-created_at']


class VacationAccrualViewSet(viewsets.ModelViewSet):
    """
    API endpoint for vacation accruals
    """
    queryset = VacationAccrual.objects.all()
    serializer_class = VacationAccrualSerializer
    permission_classes = [permissions.IsAuthenticated, IsHROrAdmin]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'vacation_type', 'accrual_date']
    ordering_fields = ['accrual_date', 'created_at']
    ordering = ['-accrual_date']


class VacationCalendarViewSet(viewsets.ViewSet):
    """
    API endpoint for vacation calendar
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def list(self, request):
        """
        Get vacation calendar data
        """
        # Default to current month if no dates provided
        today = timezone.now().date()
        start_date = request.query_params.get('start_date', today.replace(day=1))
        end_date = request.query_params.get('end_date', (today.replace(day=1) + timezone.timedelta(days=31)).replace(day=1) - timezone.timedelta(days=1))
        
        # Convert string dates to date objects if needed
        if isinstance(start_date, str):
            start_date = timezone.datetime.strptime(start_date, '%Y-%m-%d').date()
        if isinstance(end_date, str):
            end_date = timezone.datetime.strptime(end_date, '%Y-%m-%d').date()
        
        # Create and validate serializer
        serializer = VacationCalendarSerializer(data={
            'start_date': start_date,
            'end_date': end_date,
            'user_id': request.query_params.get('user_id', None),
            'department_id': request.query_params.get('department_id', None)
        })
        serializer.is_valid(raise_exception=True)
        
        # Get calendar data
        calendar_data = serializer.get_calendar_data()
        
        return Response(calendar_data)