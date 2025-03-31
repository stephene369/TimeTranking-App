import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown, Space } from 'antd';
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  BookOutlined, 
  CalendarOutlined, 
  PhoneOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const AuthLayout = () => {
  // Language selection menu
  const languageMenu = {
    items: [
      { key: 'en', label: 'English' },
      { key: 'fr', label: 'Français' },
      { key: 'es', label: 'Español' },
    ],
  };

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0'
      }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
            TimeTracker VSS
          </Link>
        </div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
          items={[
            { key: 'home', icon: <HomeOutlined />, label: <Link to="/">Home</Link> },
            { key: 'about', icon: <InfoCircleOutlined />, label: <Link to="/about">About</Link> },
            { key: 'resources', icon: <BookOutlined />, label: <Link to="/resources">Resources</Link> },
            { key: 'workshops', icon: <CalendarOutlined />, label: <Link to="/workshops">Workshops</Link> },
            { key: 'contact', icon: <PhoneOutlined />, label: <Link to="/contact">Contact</Link> },
          ]}
        />
        
        <Space>
          <Dropdown menu={languageMenu} placement="bottomRight">
            <Button type="text" icon={<GlobalOutlined />} style={{ color: 'white' }}>
              Language
            </Button>
          </Dropdown>
          
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
          
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Space>
      </Header>
      
      <Content style={{ padding: '0', marginTop: 0 }}>
        <div className="site-layout-content" style={{ padding: 24, minHeight: 380 }}>
          <Outlet />
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        Time Tracking App ©{new Date().getFullYear()} Created by VSS at Prince George's Community College
      </Footer>
    </Layout>
  );
};

export default AuthLayout;
