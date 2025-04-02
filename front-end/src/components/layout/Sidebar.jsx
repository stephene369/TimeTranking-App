import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ClockCircleOutlined,
  CheckSquareOutlined,
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    {
      key: '/student/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/student/dashboard">Dashboard</Link>,
    },
    {
      key: '/student/time-tracker',
      icon: <ClockCircleOutlined />,
      label: <Link to="/student/time-tracker">Time Tracker</Link>,
    },
    {
      key: '/student/tasks',
      icon: <CheckSquareOutlined />,
      label: <Link to="/student/tasks">Tasks</Link>,
    },
    {
      key: '/student/resources',
      icon: <BookOutlined />,
      label: <Link to="/student/resources">Resources</Link>,
    },
    {
      key: '/student/settings',
      icon: <SettingOutlined />,
      label: <Link to="/student/settings">Settings</Link>,
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    // For example: clear localStorage, reset auth state, etc.
    // localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        transition: 'all 0.4s ease'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <div className="logo" style={{ 
          height: '64px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: 'white',
          fontSize: collapsed ? '40px' : '20px',
          fontWeight: 'bold',
          margin: '16px 0'
        }}>
          {collapsed ? 'TT' : 'TimeTracker'}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath]}
          items={menuItems}
          style={{ flex: '1 0 auto' }}
        />
        
        <div style={{ 
          padding: '16px',
          marginTop: 'auto',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
