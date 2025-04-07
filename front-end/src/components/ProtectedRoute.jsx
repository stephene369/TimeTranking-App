import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    if (!isAuthenticated) {
      message.error('Vous devez être connecté pour accéder à cette page', 3);
    } else if (requiredRole && currentUser?.role !== requiredRole) {
      message.error(`Vous n'avez pas les autorisations nécessaires pour accéder à cette page`, 3);
    }
  }, [isAuthenticated, currentUser, requiredRole]);

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion tout en conservant l'URL d'origine
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier le rôle si nécessaire
  if (requiredRole && currentUser?.role !== requiredRole) {
    // Rediriger vers la page d'accueil ou le tableau de bord approprié
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
