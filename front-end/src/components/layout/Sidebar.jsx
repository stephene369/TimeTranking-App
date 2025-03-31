import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ClockCircleOutlined,
  CheckSquareOutlined,
  BookOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
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
      }}
    >
      <div className="logo" style={{ 
        height: '64px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
        fontSize: collapsed ? '16px' : '20px',
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
      />
    </Sider>
  );
};

export default Sidebar;
