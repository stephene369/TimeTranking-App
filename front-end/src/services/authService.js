// Constants
const API_URL = 'http://localhost:8000/api';
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_info';

// Token management functions
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEY, tokens.access);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// User info management
export const setUserInfo = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken() && !!getUserInfo();
};

// Authentication service
const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // Login a user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      const { user, tokens } = data;
      
      // Save tokens and user info
      setTokens(tokens);
      setUserInfo(user);
      
      return { user, tokens };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Logout
  logout: async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        const response = await fetch(`${API_URL}/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        
        if (!response.ok) {
          console.error('Logout error:', await response.text());
        }
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
    }
  },
  
  // Get user profile
  getUserProfile: async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  // Get profile details
  getProfileDetails: async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/profile/details/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile details error:', error);
      throw error;
    }
  },
  
  // Update user info
  updateUserInfo: async (userData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/profile/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      
      // Update stored user info
      const currentUser = getUserInfo();
      setUserInfo({ ...currentUser, ...data });
      
      return data;
    } catch (error) {
      console.error('Update user info error:', error);
      throw error;
    }
  },
  
  // Update profile details
  updateProfileDetails: async (profileData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/profile/details/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update profile details error:', error);
      throw error;
    }
  },
  
  // Change password
  changePassword: async (passwordData) => {
    try {
      const token = getToken();
      const response = await fetch(`${API_URL}/auth/profile/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      
      // Update tokens if new ones are returned
      if (data.tokens) {
        setTokens(data.tokens);
      }
      
      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },
  
  // Refresh access token
  refreshAccessToken: async () => {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
      
      const data = await response.json();
      
      if (data.access) {
        localStorage.setItem(TOKEN_KEY, data.access);
        return data.access;
      }
    } catch (error) {
      clearTokens();
      throw error;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getToken() && !!getUserInfo();
  }
};

export default authService;
