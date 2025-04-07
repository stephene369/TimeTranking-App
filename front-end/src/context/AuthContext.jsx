import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../types/user';

// Créer le contexte d'authentification
const AuthContext = createContext(null);

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

// Provider du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  // Fonction de déconnexion
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Valeur du contexte
  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
