import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Dropdown,
  Badge,
  Space,
  Typography,
  Breadcrumb,
} from "antd";
import {
  DashboardOutlined,
  ClockCircleOutlined,
  TaskOutlined,
  CalendarOutlined,
  BarChartOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const { Title } = Typography;

const DashboardLayout = ({ userType }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page title from path
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
  };

  // Get breadcrumb items from path
  const getBreadcrumbItems = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        title: path.charAt(0).toUpperCase() + path.slice(1).replace("-", " "),
        path: url,
      };
    });
  };

  // User menu items
  const userMenu = {
    items: [
      { key: "profile", icon: <UserOutlined />, label: "Profile" },
      { key: "settings", icon: <SettingOutlined />, label: "Settings" },
      { key: "divider", type: "divider" },
      { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
    ],
    onClick: ({ key }) => {
      if (key === "logout") {
        // Handle logout
        navigate("/login");
      } else if (key === "profile") {
        navigate(`/${userType}/profile`);
      }
    },
  };

  // Language menu
  const languageMenu = {
    items: [
      { key: "en", label: "English" },
      { key: "fr", label: "Français" },
      { key: "es", label: "Español" },
    ],
  };

  // Notification menu
  const notificationMenu = {
    items: [
      { key: "1", label: 'Task "Research Paper" is due tomorrow' },
      { key: "2", label: 'Workshop "Time Management 101" starts in 1 hour' },
      { key: "3", label: "You have completed 80% of your weekly goals" },
    ],
  };

  // Menu items based on user type
  const getMenuItems = () => {
    switch (userType) {
      case "student":
        return [
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/student/dashboard">Dashboard</Link>,
          },
          {
            key: "time-tracker",
            icon: <ClockCircleOutlined />,
            label: <Link to="/student/time-tracker">Time Tracker</Link>,
          },
          {
            key: "tasks",
            icon: <TaskOutlined />,
            label: <Link to="/student/tasks">Tasks</Link>,
          },
          {
            key: "calendar",
            icon: <CalendarOutlined />,
            label: <Link to="/student/calendar">Calendar</Link>,
          },
          {
            key: "reports",
            icon: <BarChartOutlined />,
            label: <Link to="/student/reports">Reports</Link>,
          },
          {
            key: "resources",
            icon: <BookOutlined />,
            label: <Link to="/student/resources">Resources</Link>,
          },
        ];
      case "advisor":
        return [
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/advisor/dashboard">Dashboard</Link>,
          },
          {
            key: "students",
            icon: <TeamOutlined />,
            label: <Link to="/advisor/students">Students</Link>,
          },
          {
            key: "workshops",
            icon: <CalendarOutlined />,
            label: <Link to="/advisor/workshops">Workshops</Link>,
          },
        ];
      case "admin":
        return [
          {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: <Link to="/admin/dashboard">Dashboard</Link>,
          },
          {
            key: "users",
            icon: <TeamOutlined />,
            label: <Link to="/admin/users">User Management</Link>,
          },
          {
            key: "content",
            icon: <FileTextOutlined />,
            label: <Link to="/admin/content">Content Management</Link>,
          },
          {
            key: "workshops",
            icon: <CalendarOutlined />,
            label: <Link to="/admin/workshops">Workshop Management</Link>,
          },
          {
            key: "settings",
            icon: <SettingOutlined />,
            label: <Link to="/admin/settings">System Settings</Link>,
          },
        ];
      default:
        return [];
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", padding: 0, margin: 0 }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
      >
        <div
          className="logo"
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0",
          }}
        >
          {collapsed ? (
            <ClockCircleOutlined style={{ fontSize: 24, color: "white" }} />
          ) : (
            <Title level={4} style={{ color: "white", margin: 0 }}>
              TimeTracker
            </Title>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            location.pathname.split("/").pop() || "dashboard",
          ]}
          items={getMenuItems()}
        />
      </Sider>
      <Layout style={{width:"100%"}}>
        <Header
          style={{
            margin: 0,
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Space style={{ marginRight: 24 }}>
            <Dropdown menu={languageMenu} placement="bottomRight">
              <Button type="text" icon={<GlobalOutlined />}>
                Language
              </Button>
            </Dropdown>

            <Dropdown menu={notificationMenu} placement="bottomRight">
              <Badge count={3}>
                <Button type="text" icon={<BellOutlined />} />
              </Badge>
            </Dropdown>

            <Dropdown menu={userMenu} placement="bottomRight">
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span>
                  {userType === "student"
                    ? "John Doe"
                    : userType === "advisor"
                    ? "Jane Smith"
                    : "Admin User"}
                </span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ marginBottom: 16 }}>
            <Breadcrumb
              items={getBreadcrumbItems().map((item) => ({
                title: item.title,
              }))}
            />
            <Title level={3} style={{ margin: "16px 0" }}>
              {getPageTitle()}
            </Title>
          </div>
          <div style={{ padding: 0, background: "#fff", minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Time Tracking App ©{new Date().getFullYear()} Created by VSS at Prince
          George's Community College
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
