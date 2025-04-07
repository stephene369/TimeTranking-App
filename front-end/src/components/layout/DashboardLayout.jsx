import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';


const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' , padding:0, margin:0}}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{padding:0, margin:0}}>
        <Header 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
            overflow: 'auto'
          }}
          className="site-layout-content"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
