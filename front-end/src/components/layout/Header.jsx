import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Typography, Space, Button } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  BellOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = ({ collapsed, setCollapsed }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  // Dropdown menu for user profile
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to={`/${currentUser?.role}/profile`}>My Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to={`/${currentUser?.role}/settings`}>Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  
  // Determine base path based on role
  const getBasePath = () => {
    if (!currentUser) return '/';
    return `/${currentUser.role}`;
  };
  
  return (
    <AntHeader style={{ 
      margin:0,
      padding: '0', 
      background: '#fff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
        <Link to={getBasePath()} style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '18px', marginLeft: '10px' }}>
            Time Management App
          </h1>
        </Link>
      </div>
      
      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Space size="large">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              style={{ fontSize: '16px' }}
            />
            
            <Dropdown overlay={userMenu} trigger={['click']}>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar 
                style={{marginRight:10}}
                  size="medium" 
                  icon={<UserOutlined />} 
                  src={currentUser.profile?.profile_picture} 
                />
                {/* <div style={{ marginLeft: 1 }}>
                  <Text strong>{currentUser.first_name} {currentUser.last_name}</Text>
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {currentUser.role === 'student' ? 'Student' : 
                       currentUser.role === 'advisor' ? 'Advisor' : 'Administrator'}
                    </Text>
                  </div>
                </div> */}
              </div>
            </Dropdown>
          </Space>
        </div>
      ) : (
        <Space>
          <Button type="link" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button type="primary" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Space>
      )}
    </AntHeader>
  );
};

export default Header;