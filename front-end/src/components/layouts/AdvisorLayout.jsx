import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography, Badge } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  DashboardOutlined, 
  TeamOutlined, 
  CalendarOutlined, 
  FileOutlined, 
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdvisorLayout = ({ children }) => {
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
        <Link to="/advisor/settings">Profile Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const notificationsMenu = (
    <Menu>
      <Menu.Item key="1">
        <b>New student registration</b>
        <div>Sarah Williams has registered</div>
      </Menu.Item>
      <Menu.Item key="2">
        <b>Appointment reminder</b>
        <div>Meeting with Robert Brown in 1 hour</div>
      </Menu.Item>
      <Menu.Item key="3">
        <b>Workshop update</b>
        <div>5 new registrations for Time Management</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="view-all">
        <Link to="/advisor/notifications">View all notifications</Link>
      </Menu.Item>
    </Menu>
  );

  const menuItems = [
    {
      key: '/advisor/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/advisor/dashboard">Dashboard</Link>,
    },
    {
      key: '/advisor/students',
      icon: <TeamOutlined />,
      label: <Link to="/advisor/students">Students</Link>,
    },
    {
      key: '/advisor/workshops',
      icon: <FileOutlined />,
      label: <Link to="/advisor/workshops">Workshops</Link>,
    },
    {
      key: '/advisor/settings',
      icon: <SettingOutlined />,
      label: <Link to="/advisor/settings">Settings</Link>,
    },
  ];

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
            <Title level={4} style={{ color: 'white', margin: 0 }}>VSS Advisor Portal</Title>
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
          <div style={{ paddingRight: 24, display: 'flex', alignItems: 'center' }}>
            <Dropdown overlay={notificationsMenu} trigger={['click']}>
              <Badge count={3} style={{ marginRight: 24 }}>
                <Button type="text" icon={<BellOutlined />} style={{ fontSize: '16px' }} />
              </Badge>
            </Dropdown>
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
  );
};

export default AdvisorLayout;
