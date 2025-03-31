import React from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Badge, Typography } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  BellOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = ({ collapsed, toggleSidebar }) => {
  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to="/student/settings">Profile Settings</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const notificationItems = [
    {
      key: '1',
      label: (
        <div>
          <Text strong>Task Due Soon</Text>
          <div>Complete Math Assignment is due tomorrow</div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          <Text strong>New Resource Available</Text>
          <div>Check out the new time management workshop</div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div>
          <Text strong>Weekly Summary</Text>
          <div>Your weekly activity report is ready</div>
        </div>
      ),
    },
  ];

  return (
    <Header style={{ 
      padding: 0, 
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)'
    }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleSidebar}
        style={{ fontSize: '16px', width: 64, height: 64 }}
      />
      
      <Space style={{ marginRight: 24 }}>
        <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          arrow
        >
          <Badge count={3} size="small">
            <Button type="text" icon={<BellOutlined />} style={{ fontSize: '16px' }} />
          </Badge>
        </Dropdown>
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span style={{ display: 'inline-block', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              John Doe
            </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderComponent;
