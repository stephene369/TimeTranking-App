import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Spin } from 'antd';

const Logout = () => {
  const { logout } = useAuth();
  
  useEffect(() => {
    const performLogout = async () => {
      await logout();
    };
    
    performLogout();
  }, [logout]);
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin tip="Logging out..." />
      <Navigate to="/login" replace />
    </div>
  );
};

export default Logout;
