import { UserRole } from '../types/users';

// Define types for authentication
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResult {
  success: boolean;
  message?: string;
  user?: User;
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if token exists
};

// Get current user data
export const getCurrentUser = (): User | null => {
  if (!isAuthenticated()) {
    return null;
  }
  
  const userDataStr = localStorage.getItem('userData');
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      return userData as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  
  return null;
};

// Get user role from local storage or default to EMPLOYEE
export const getUserRole = (): UserRole => {
  const user = getCurrentUser();
  if (user && user.role) {
    return user.role;
  }
  
  // Default role if not found
  return UserRole.EMPLOYEE;
};

// Set authentication data
const setAuth = (userData: User): void => {
  localStorage.setItem('token', 'mock-jwt-token');
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Clear authentication data
export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
};

// Login function
export const login = (email: string, password: string): LoginResult => {
  // In a real app, this would validate credentials against an API
  // For simulation, we'll accept any non-empty values
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }
  
  let role = UserRole.EMPLOYEE;
  if (email.includes('employer')) {
    role = UserRole.EMPLOYER;
  } else if (email.includes('jobseeker')) {
    role = UserRole.JOB_SEEKER;
  }
  console.log(role)
  
  // Create a mock user object
  const userData: User = {
    id: '12345',
    email: email,
    name: email.split('@')[0], // Use part of email as name
    role: role
  };
  
  // Set authentication
  setAuth(userData);
  
  return { success: true, user: userData };
};

// Async version of login for compatibility with Promise-based code
export const loginAsync = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const result = login(email, password);
    if (result.success && result.user) {
      resolve(result.user);
    } else {
      reject(new Error(result.message || 'Login failed'));
    }
  });
};

// Logout function
export const logout = (): void => {
  clearAuth();
  window.location.href = '/';
};
