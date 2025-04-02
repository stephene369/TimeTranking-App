import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderComponent from './Header';

const { Content } = Layout;

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh', padding:0,margin:0}}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{
        margin:0,
        padding:0
      }}>
        <HeaderComponent collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Content style={{ margin:'0px 0px', padding: 20, minHeight: 280, background: '#f0f2f5' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;
