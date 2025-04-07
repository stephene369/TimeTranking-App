import React from 'react';
import { Layout, Typography } from 'antd';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const AuthLayout = () => {
  const { isAuthenticated, currentUser, loading } = useAuth();
  
  // Si l'utilisateur est déjà authentifié, rediriger vers son tableau de bord
  if (!loading && isAuthenticated && currentUser) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff', 
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 50px'
      }}>
        <Link to="/">
          <Title level={3} style={{ margin: 0 }}>Time Management App</Title>
        </Link>
      </Header>
      <Content style={{ 
        padding: '50px', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Time Management App ©{new Date().getFullYear()} Created by Your Name
      </Footer>
    </Layout>
  );
};

export default AuthLayout;
