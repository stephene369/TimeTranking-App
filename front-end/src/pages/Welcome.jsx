import React from "react";
import {
  Typography,
  Button,
  Row,
  Col,
  Card,
  Space,
  Divider,
  List,
  Avatar,
} from "antd";
import {
  ClockCircleOutlined,
  BookOutlined,
  TeamOutlined,
  ToolOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Paragraph, Text } = Typography;

const Welcome = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  // Fonction pour naviguer vers le tableau de bord approprié
  const goToDashboard = () => {
    if (currentUser?.role === "student") {
      navigate("/student/dashboard");
    } else if (currentUser?.role === "advisor") {
      navigate("/advisor/dashboard");
    } else if (currentUser?.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  const features = [
    {
      title: "Time Management Tools",
      description:
        "Research-based tools to help you manage your academic and personal time effectively.",
      icon: <ClockCircleOutlined style={{ fontSize: 32 }} />,
    },
    {
      title: "Workshop Access",
      description:
        "Access to all VSS workshops and resources to enhance your vocational skills.",
      icon: <BookOutlined style={{ fontSize: 32 }} />,
    },
    {
      title: "Advisor Support",
      description:
        "Connect with VSS advisors for personalized guidance and support.",
      icon: <TeamOutlined style={{ fontSize: 32 }} />,
    },
    {
      title: "Career Resources",
      description:
        "Tools and resources to help you prepare for your career in your chosen field.",
      icon: <ToolOutlined style={{ fontSize: 32 }} />,
    },
  ];

  const workshops = [
    {
      title: "Effective Time Management for Students",
      date: "October 15, 2023",
      location: "Room 203, Student Center",
    },
    {
      title: "Career Preparation Workshop",
      date: "October 22, 2023",
      location: "Virtual (Zoom)",
    },
    {
      title: "Resume Building for Technical Fields",
      date: "November 5, 2023",
      location: "Room 105, Career Center",
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <Row gutter={[24, 48]} align="middle">
        <Col xs={24} md={12}>
          <Title>Vocational Support Services</Title>
          <Title level={4} type="secondary">
            Empowering students in Career and Technical Education programs
          </Title>
          <Paragraph style={{ fontSize: 16, marginTop: 24 }}>
            The Vocational Support Services (VSS) is a campus resource for
            students seeking to earn an Associate of Applied Science (A.A.S.)
            degree or a certificate within Career and Technical Education (CTE)
            programs.
          </Paragraph>
          <Paragraph style={{ fontSize: 16 }}>
            Our mission is to equip students with the theoretical knowledge and
            practical skills needed to transition successfully to their career
            field upon completion of their program.
          </Paragraph>
          <Space size="large" style={{ marginTop: 24 }}>
            {isAuthenticated ? (
              <Button 
                type="primary" 
                size="large" 
                icon={<DashboardOutlined />}
                onClick={goToDashboard}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button type="primary" size="large">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="large">
                  <Link to="/register">Create Account</Link>
                </Button>
              </>
            )}
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="Students working together"
            style={{
              width: "100%",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Col>
      </Row>
      <Divider style={{ margin: "60px 0 40px" }}>
        <Title level={2}>How VSS Can Help You</Title>
      </Divider>
      <Row gutter={[24, 24]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card style={{ height: "100%", textAlign: "center" }} hoverable>
              <div style={{ marginBottom: 16, color: "#1890ff" }}>
                {feature.icon}
              </div>
              <Title level={4}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: "60px 0 40px" }}>
        <Title level={2}>Upcoming Workshops</Title>
      </Divider>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={workshops}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<BookOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                  />
                }
                title={item.title}
                description={
                  <Space direction="vertical">
                    <Text>
                      <strong>Date:</strong> {item.date}
                    </Text>
                    <Text>
                      <strong>Location:</strong> {item.location}
                    </Text>
                  </Space>
                }
              />
              <Button>Register</Button>
            </List.Item>
          )}
        />
      </Card>
      <Divider style={{ margin: "60px 0 40px" }}>
        <Title level={2}>About VSS Time Management App</Title>
      </Divider>
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} md={12}>
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            alt="VSS App Screenshot"
            style={{
              width: "100%",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Title level={3}>Improve Your Time Management Skills</Title>
          <Paragraph style={{ fontSize: 16 }}>
            The VSS Time Management App is designed to help students improve
            their time management skills, which is crucial for success in both
            academic and personal life.
          </Paragraph>
          <Paragraph style={{ fontSize: 16 }}>
            Based on extensive research, our app provides practical tools and
            techniques to help you:
          </Paragraph>
          <ul style={{ fontSize: 16 }}>
            <li>Track how you spend your time</li>
            <li>Set priorities for academic and personal tasks</li>
            <li>Create effective schedules</li>
            <li>Reduce procrastination</li>
            <li>Balance school, work, and personal life</li>
          </ul>
          {isAuthenticated ? (
            <Button 
              type="primary" 
              size="large" 
              style={{ marginTop: 16 }}
              onClick={goToDashboard}
            >
              Access Your Dashboard
            </Button>
          ) : (
            <Button type="primary" size="large" style={{ marginTop: 16 }}>
              <Link to="/register">Get Started Now</Link>
            </Button>
          )}
        </Col>
      </Row>
      <Divider style={{ margin: "60px 0 40px" }}>
        <Title level={2}>Contact VSS</Title>
      </Divider>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Location" style={{ height: "100%" }}>
            <Paragraph>
              Student Success Center, Room 305
              <br />
              Main Campus
              <br />
              123 College Avenue
              <br />
              Anytown, ST 12345
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Hours" style={{ height: "100%" }}>
            <Paragraph>
              <strong>Monday - Thursday:</strong> 8:00 AM - 6:00 PM
              <br />
              <strong>Friday:</strong> 8:00 AM - 5:00 PM
              <br />
              <strong>Saturday:</strong> 10:00 AM - 2:00 PM
              <br />
              <strong>Sunday:</strong> Closed
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Contact Information" style={{ height: "100%" }}>
            <Paragraph>
              <strong>Phone:</strong> (555) 123-4567
              <br />
              <strong>Email:</strong> vss@college.edu
              <br />
              <strong>Social Media:</strong> @VSSCollege
            </Paragraph>
            <Button type="primary">Schedule an Appointment</Button>
          </Card>
        </Col>
      </Row>
      <Divider style={{ margin: "60px 0 20px" }} />
      <footer style={{ textAlign: "center", padding: "20px 0" }}>
        <Paragraph>
          © 2023 Vocational Support Services. All rights reserved.
        </Paragraph>
        <Space split={<Divider type="vertical" />}>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/help">Help Center</Link>
        </Space>
      </footer>
    </div>
  );
};

export default Welcome;
