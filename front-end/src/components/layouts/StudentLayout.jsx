import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography, Divider } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  DashboardOutlined, 
  ClockCircleOutlined, 
  CheckSquareOutlined, 
  BookOutlined, 
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const StudentLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/settings">Profile Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '/time-tracker',
      icon: <ClockCircleOutlined />,
      label: <Link to="/time-tracker">Time Tracker</Link>,
    },
    {
      key: '/tasks',
      icon: <CheckSquareOutlined />,
      label: <Link to="/tasks">Tasks</Link>,
    },
    {
      key: '/resources',
          icon: <BookOutlined />,
          label: <Link to="/resources">Resources</Link>,
        },
        {
          key: '/settings',
          icon: <SettingOutlined />,
          label: <Link to="/settings">Settings</Link>,
        },
      ]

      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth="80"
            width={250}
          >
            <div style={{ 
              height: 64, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? 0 : '0 16px',
            }}>
              {collapsed ? (
                <div style={{ color: 'white', fontSize: 24 }}>VSS</div>
              ) : (
                <Title level={4} style={{ color: 'white', margin: 0 }}>VSS Time Manager</Title>
              )}
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header style={{ 
              padding: 0, 
              background: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
              <div style={{ paddingRight: 24 }}>
                <Dropdown overlay={userMenu} trigger={['click']}>
                  <Space style={{ cursor: 'pointer' }}>
                    <Avatar icon={<UserOutlined />} />
                    {currentUser.firstName} {currentUser.lastName}
                  </Space>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      )
}

export default StudentLayout