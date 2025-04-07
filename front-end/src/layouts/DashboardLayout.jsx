import React, { useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { 
  DashboardOutlined, 
  ClockCircleOutlined, 
  CheckSquareOutlined,
  CalendarOutlined,
  BarChartOutlined,
  BookOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';

const { Content, Sider } = Layout;

const DashboardLayout = ({ userType = 'student' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // If user is not authenticated, redirect to login page
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If user is authenticated but doesn't have the right role, redirect to their dashboard
  if (!loading && isAuthenticated && currentUser?.role !== userType) {
    return <Navigate to={`/${currentUser.role}/dashboard`} replace />;
  }
  
  // Display a spinner while loading
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }
  
  // Determine menu items based on user type
  const getMenuItems = () => {
    const basePath = `/${userType}`;
    
    // Menu for students
    if (userType === 'student') {
      return [
        {
          key: `${basePath}/dashboard`,
          icon: <DashboardOutlined />,
          label: <Link to={`${basePath}/dashboard`}>Dashboard</Link>,
        },
        {
          key: `${basePath}/time-tracker`,
          icon: <ClockCircleOutlined />,
          label: <Link to={`${basePath}/time-tracker`}>Time Tracking</Link>,
        },
        {
          key: `${basePath}/tasks`,
          icon: <CheckSquareOutlined />,
          label: <Link to={`${basePath}/tasks`}>Tasks</Link>,
        },
        {
          key: `${basePath}/calendar`,
          icon: <CalendarOutlined />,
          label: <Link to={`${basePath}/calendar`}>Calendar</Link>,
        },
        {
          key: `${basePath}/reports`,
          icon: <BarChartOutlined />,
          label: <Link to={`${basePath}/reports`}>Reports</Link>,
        },
        {
          key: `${basePath}/resources`,
          icon: <BookOutlined />,
          label: <Link to={`${basePath}/resources`}>Resources</Link>,
        },
        {
          key: `${basePath}/profile`,
          icon: <UserOutlined />,
          label: <Link to={`${basePath}/profile`}>Profile</Link>,
        },
      ];
    }
    
    // Menu for advisors
    if (userType === 'advisor') {
      return [
        {
          key: `${basePath}/dashboard`,
          icon: <DashboardOutlined />,
          label: <Link to={`${basePath}/dashboard`}>Dashboard</Link>,
        },
        {
          key: `${basePath}/students`,
          icon: <TeamOutlined />,
          label: <Link to={`${basePath}/students`}>Students</Link>,
        },
        {
          key: `${basePath}/workshops`,
          icon: <BookOutlined />,
          label: <Link to={`${basePath}/workshops`}>Workshops</Link>,
        },
        {
          key: `${basePath}/profile`,
          icon: <UserOutlined />,
          label: <Link to={`${basePath}/profile`}>Profile</Link>,
        },
      ];
    }
    
    // Menu for administrators
    if (userType === 'admin') {
      return [
        {
          key: `${basePath}/dashboard`,
          icon: <DashboardOutlined />,
          label: <Link to={`${basePath}/dashboard`}>Dashboard</Link>,
        },
        {
          key: `${basePath}/users`,
          icon: <TeamOutlined />,
          label: <Link to={`${basePath}/users`}>Users</Link>,
        },
        {
          key: `${basePath}/settings`,
          icon: <SettingOutlined />,
          label: <Link to={`${basePath}/settings`}>Settings</Link>,
        },
      ];
    }
    
    return [];
  };
  
  return (
    <Layout style={{ minHeight: '100vh',  }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {!collapsed ? 'TIME MANAGER' : 'TM'}
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={[location.pathname]}
          items={getMenuItems()}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s',background:"rgba(110, 128, 211, 0.06)" }}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ margin: '0 ', padding: 24, background: 'rgba(255, 255, 255, 0)', minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;