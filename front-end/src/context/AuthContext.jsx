import React, { createContext, useState, useContext, useEffect } from 'react';
import authService, { 
  getUserInfo, 
  isAuthenticated as checkIsAuthenticated,
  clearTokens
} from '../services/authService';
import { DEFAULT_USER } from '../types/user';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getUserInfo() || DEFAULT_USER);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        if (checkIsAuthenticated()) {
          const userInfo = getUserInfo();
          setCurrentUser(userInfo);
          setIsAuthenticated(true);
          
          // Load user profile if authenticated
          await refreshUserProfile();
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        handleLogout();
      }
    };
    
    checkAuth();
  }, []);

  const refreshUserProfile = async () => {
    if (!checkIsAuthenticated()) return;
    
    setIsLoading(true);
    try {
      const profileData = await authService.getUserProfile();
      setUserProfile(profileData);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setError('Failed to load user profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user } = await authService.login(credentials);
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Load user profile after login
      await refreshUserProfile();
      
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      setCurrentUser(DEFAULT_USER);
      setUserProfile(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedUser = await authService.updateUserInfo(userData);
      setCurrentUser(prevUser => ({ ...prevUser, ...updatedUser }));
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      setError(error.message || 'Profile update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileDetails = async (profileData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedProfile = await authService.updateProfileDetails(profileData);
      setUserProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
      return updatedProfile;
    } catch (error) {
      console.error('Profile details update failed:', error);
      setError(error.message || 'Profile details update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (passwordData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await authService.changePassword(passwordData);
      return result;
    } catch (error) {
      console.error('Password change failed:', error);
      setError(error.message || 'Password change failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    userProfile,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile,
    updateProfileDetails,
    changePassword,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
