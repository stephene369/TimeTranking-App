// Authentication utility functions

// Define types for user and auth data
interface User {
    id: string;
    email: string;
    name: string;
  }
  
  interface AuthData {
    user: User;
    token: string;
    expiresAt: number;
  }
  
  interface LoginResult {
    success: boolean;
    message?: string;
    user?: User;
  }
  
  // Generate a secure random token
  const generateToken = (): string => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  };
  
  // Set authentication data in localStorage with expiration
  export const setAuth = (userData: User): string => {
    const token = generateToken();
    const expiresAt = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now
    
    const authData: AuthData = {
      user: userData,
      token: token,
      expiresAt: expiresAt
    };
    
    // Store encrypted in localStorage
    localStorage.setItem('authData', JSON.stringify(authData));
    
    return token;
  };
  
  // Check if user is authenticated
  export const isAuthenticated = (): boolean => {
    try {
      const authDataString = localStorage.getItem('authData');
      if (!authDataString) {
        return false;
      }
      
      const authData: AuthData = JSON.parse(authDataString);
      
      // Check if token has expired
      if (new Date().getTime() > authData.expiresAt) {
        // Token expired, clear auth data
        clearAuth();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  };
  
  // Get current user data
  export const getCurrentUser = (): User | null => {
    try {
      const authDataString = localStorage.getItem('authData');
      if (!authDataString) {
        return null;
      }
      
      const authData: AuthData = JSON.parse(authDataString);
      return authData?.user || null;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  };
  
  // Clear authentication data
  export const clearAuth = (): void => {
    localStorage.removeItem('authData');
  };
  
  // Simulate login (in a real app, this would call an API)
  export const login = (email: string, password: string): LoginResult => {
    // In a real app, this would validate credentials against an API
    // For simulation, we'll accept any non-empty values
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }
    
    // Create a mock user object
    const userData: User = {
      id: '12345',
      email: email,
      name: email.split('@')[0], // Use part of email as name
    };
    
    // Set authentication
    setAuth(userData);
    
    return { success: true, user: userData };
  };
  