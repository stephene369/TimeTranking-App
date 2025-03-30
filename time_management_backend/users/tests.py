from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import UserProfile, UserPreferences

User = get_user_model()

class UserModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User',
            role='employee',
            department='Engineering'
        )
    
    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.first_name, 'Test')
        self.assertEqual(self.user.last_name, 'User')
        self.assertEqual(self.user.role, 'employee')
        self.assertEqual(self.user.department, 'Engineering')
    
    def test_profile_creation(self):
        """Test that a profile is automatically created"""
        self.assertTrue(hasattr(self.user, 'profile'))
        self.assertIsInstance(self.user.profile, UserProfile)
    
    def test_preferences_creation(self):
        """Test that preferences are automatically created"""
        self.assertTrue(hasattr(self.user, 'preferences'))
        self.assertIsInstance(self.user.preferences, UserPreferences)


class UserAPITests(APITestCase):
    def setUp(self):
        # Create admin user
        self.admin_user = User.objects.create_user(
            username='admin',
            email='admin@example.com',
            password='adminpassword',
            first_name='Admin',
            last_name='User',
            role='system_admin',
            is_staff=True
        )
        
        # Create regular user
        self.regular_user = User.objects.create_user(
            username='regular',
            email='regular@example.com',
            password='regularpassword',
            first_name='Regular',
            last_name='User',
            role='employee'
        )
        
        # Create manager user
        self.manager_user = User.objects.create_user(
            username='manager',
            email='manager@example.com',
            password='managerpassword',
            first_name='Manager',
            last_name='User',
            role='manager'
        )
        
        # Set manager for regular user
        self.regular_user.manager = self.manager_user
        self.regular_user.save()
    
    def test_login(self):
        """Test that a user can login and get a token"""
        url = reverse('login')
        data = {
            'username': 'regular',
            'password': 'regularpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)
    
    def test_user_list_as_admin(self):
        """Test that admin can see all users"""
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  # All 3 users
    
    def test_user_list_as_manager(self):
        """Test that manager can see themselves and their team"""
        self.client.force_authenticate(user=self.manager_user)
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Manager and regular user
    
    def test_user_list_as_regular(self):
        """Test that regular user can only see themselves"""
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Only themselves
    
    def test_user_detail_permission(self):
        """Test user detail permissions"""
        # Regular user trying to access manager's profile
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('user-detail', args=[self.manager_user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
        # Manager trying to access their team member's profile
        self.client.force_authenticate(user=self.manager_user)
        url = reverse('user-detail', args=[self.regular_user.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_change_password(self):
        """Test password change functionality"""
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('user-change-password')
        data = {
            'old_password': 'regularpassword',
            'new_password': 'newregularpassword',
            'confirm_password': 'newregularpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify the password was changed
        self.assertTrue(
            User.objects.get(username='regular').check_password('newregularpassword')
        )
    
    def test_profile_update(self):
        """Test profile update functionality"""
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('userprofile-detail', args=[self.regular_user.profile.id])
        data = {
            'phone_number': '123-456-7890',
            'date_of_birth': '1990-01-01',
            'pto_accrual_rate': 2.0
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify the profile was updated
        updated_profile = UserProfile.objects.get(user=self.regular_user)
        self.assertEqual(updated_profile.phone_number, '123-456-7890')
        self.assertEqual(str(updated_profile.date_of_birth), '1990-01-01')
        self.assertEqual(updated_profile.pto_accrual_rate, 2.0)
    
    def test_preferences_update(self):
        """Test preferences update functionality"""
        self.client.force_authenticate(user=self.regular_user)
        url = reverse('userpreferences-detail', args=[self.regular_user.preferences.id])
        data = {
            'email_notifications': False,
            'theme': 'dark',
            'language': 'fr'
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify the preferences were updated
        updated_prefs = UserPreferences.objects.get(user=self.regular_user)
        self.assertEqual(updated_prefs.email_notifications, False)
        self.assertEqual(updated_prefs.theme, 'dark')
        self.assertEqual(updated_prefs.language, 'fr')
