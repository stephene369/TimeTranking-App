import React, { useState, useEffect } from "react";
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
  Carousel,
  Modal,
  Tag,
  Grid,
} from "antd";
import {
  ClockCircleOutlined,
  BookOutlined,
  TeamOutlined,
  ToolOutlined,
  DashboardOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  BankOutlined,
  TrophyOutlined,
  GlobalOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

// Composant pour l'intégration de vidéos YouTube
const YouTubeEmbed = ({ youtubeId, height = "400px" }) => {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Données des vidéos PGCC
const pgccVideos = [
  {
    id: 1,
    title: "Steps to Enrolling at PGCC",
    description: "Enrolling at Prince George's Community College is as easy as 1,2,3...",
    youtubeId: "86RSlsBUij4",
    thumbnail: `https://img.youtube.com/vi/86RSlsBUij4/hqdefault.jpg`,
  },
  {
    id: 2,
    title: "PGCC Campus Tour",
    description: "Take a virtual tour of the beautiful Prince George's Community College campus",
    youtubeId: "P_x0PKuApxE",
    thumbnail: `https://img.youtube.com/vi/P_x0PKuApxE/hqdefault.jpg`,
  },
  {
    id: 3,
    title: "PGCC Strategic Plan",
    description: "Learn about the core commitments of Prince George's Community College's strategic plan",
    youtubeId: "M7NKvfIvrCU",
    thumbnail: `https://img.youtube.com/vi/M7NKvfIvrCU/hqdefault.jpg`,
  },
];

// Données des programmes PGCC
const pgccPrograms = [
  {
    title: "Health Sciences",
    description: "Programs in nursing, health information management, and more",
    icon: <TeamOutlined />,
  },
  {
    title: "Business & IT",
    description: "Programs in business management, cybersecurity, and computer science",
    icon: <ToolOutlined />,
  },
  {
    title: "Arts & Humanities",
    description: "Programs in fine arts, communications, and liberal arts",
    icon: <BookOutlined />,
  },
  {
    title: "STEM",
    description: "Programs in engineering, mathematics, and natural sciences",
    icon: <GlobalOutlined />,
  },
];

// Données des événements PGCC
const pgccEvents = [
  {
    title: "Fall 2025 Registration",
    date: "August 1-15, 2025",
    location: "Online & Largo Student Center",
  },
  {
    title: "New Student Orientation",
    date: "August 20, 2025",
    location: "Novak Field House",
  },
  {
    title: "Career & Transfer Fair",
    date: "October 5, 2025",
    location: "Center for Performing Arts",
  },
];

const Welcome = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const screens = useBreakpoint();

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

  // Fonction pour ouvrir le modal vidéo
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setVideoModalVisible(true);
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

  // Ajuster les tailles de texte en fonction de la taille d'écran
  const getTitleSize = () => {
    if (screens.xs) return { fontSize: '28px', lineHeight: '34px' };
    if (screens.sm) return { fontSize: '32px', lineHeight: '38px' };
    return { fontSize: '38px', lineHeight: '46px' };
  };

  const getSubtitleSize = () => {
    if (screens.xs) return { fontSize: '18px', lineHeight: '24px' };
    return { fontSize: '22px', lineHeight: '28px' };
  };

  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: "0 auto", 
      padding: screens.xs ? "20px 16px" : "40px 20px", 
      overflow: "hidden" 
    }}>
      {/* Hero Section */}
      <Row gutter={[24, screens.xs ? 24 : 48]} align="middle">
        <Col xs={24} md={12}>
          <Title style={getTitleSize()}>Vocational Support Services</Title>
          <Title level={4} type="secondary" style={getSubtitleSize()}>
            Empowering students at Prince George's Community College
          </Title>
          <Paragraph style={{ fontSize: screens.xs ? 14 : 16, marginTop: screens.xs ? 16 : 24 }}>
            The Vocational Support Services (VSS) at PGCC is a campus resource for
            students seeking to earn an Associate of Applied Science (A.A.S.)
            degree or a certificate within Career and Technical Education (CTE)
            programs.
          </Paragraph>
          <Paragraph style={{ fontSize: screens.xs ? 14 : 16 }}>
            Our mission is to equip students with the theoretical knowledge and
            practical skills needed to transition successfully to their career
            field upon completion of their program.
          </Paragraph>
          <Space size={screens.xs ? "middle" : "large"} style={{ marginTop: screens.xs ? 16 : 24 }} wrap>
            {isAuthenticated ? (
              <Button 
                type="primary" 
                size={screens.xs ? "middle" : "large"} 
                icon={<DashboardOutlined />}
                onClick={goToDashboard}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button type="primary" size={screens.xs ? "middle" : "large"}>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size={screens.xs ? "middle" : "large"}>
                  <Link to="/register">Create Account</Link>
                </Button>
              </>
            )}
          </Space>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ 
            width: "100%", 
            maxHeight: screens.xs ? "250px" : "350px", 
            overflow: "hidden",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
            <Carousel autoplay>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="College Campus Building"
                  style={{
                    width: "100%",
                    height: screens.xs ? "250px" : "350px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="College Library"
                  style={{
                    width: "100%",
                    height: screens.xs ? "250px" : "350px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="College Campus"
                  style={{
                    width: "100%",
                    height: screens.xs ? "250px" : "350px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>

      {/* PGCC Videos Section */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>Discover PGCC</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        {pgccVideos.map((video) => (
          <Col xs={24} sm={12} md={8} key={video.id}>
            <Card 
              hoverable 
              bodyStyle={{ padding: screens.xs ? 12 : 24 }}
              cover={
                <div style={{ position: "relative" }}>
                  <img 
                    alt={video.title} 
                    src={video.thumbnail} 
                    style={{ 
                      width: "100%", 
                      height: screens.xs ? "140px" : "180px", 
                      objectFit: "cover" 
                    }}
                  />
                  <div 
                    style={{ 
                      position: "absolute", 
                      top: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "100%", 
                      background: "rgba(0,0,0,0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer"
                    }}
                    onClick={() => openVideoModal(video)}
                  >
                    <PlayCircleOutlined style={{ fontSize: screens.xs ? 36 : 48, color: "white" }} />
                  </div>
                </div>
              }
              onClick={() => openVideoModal(video)}
            >
              <Card.Meta 
                title={<div style={{ fontSize: screens.xs ? 14 : 16 }}>{video.title}</div>} 
                description={<div style={{ fontSize: screens.xs ? 12 : 14 }}>{video.description}</div>} 
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* PGCC Programs Section */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>Academic Programs</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        {pgccPrograms.map((program, index) => (
          <Col xs={12} sm={12} lg={6} key={index}>
            <Card 
              style={{ height: "100%", textAlign: "center" }} 
              hoverable
              bodyStyle={{ padding: screens.xs ? 12 : 24 }}
            >
              <div style={{ marginBottom: 16, color: "#1890ff" }}>
                {React.cloneElement(program.icon, { style: { fontSize: screens.xs ? 24 : 32 } })}
              </div>
              <Title level={screens.xs ? 5 : 4}>{program.title}</Title>
              <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
                {program.description}
              </Paragraph>
              <Button type="link" size={screens.xs ? "small" : "middle"}>Learn More</Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* How VSS Can Help You */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>How VSS Can Help You</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        {features.map((feature, index) => (
          <Col xs={12} sm={12} lg={6} key={index}>
            <Card 
              style={{ height: "100%", textAlign: "center" }} 
              hoverable
              bodyStyle={{ padding: screens.xs ? 12 : 24 }}
            >
              <div style={{ marginBottom: 16, color: "#1890ff" }}>
                {React.cloneElement(feature.icon, { style: { fontSize: screens.xs ? 24 : 32 } })}
              </div>
              <Title level={screens.xs ? 5 : 4}>{feature.title}</Title>
              <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* PGCC Events */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>Upcoming Events</Title>
      </Divider>
      <Card bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
        <List
          itemLayout="horizontal"
          dataSource={pgccEvents}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    icon={<CalendarOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                    size={screens.xs ? "small" : "default"}
                  />
                }
                title={<div style={{ fontSize: screens.xs ? 14 : 16 }}>{item.title}</div>}
                description={
                  <Space direction={screens.xs ? "vertical" : "horizontal"} size={screens.xs ? 0 : 8}>
                    <Text style={{ fontSize: screens.xs ? 12 : 14 }}>
                      <strong>Date:</strong> {item.date}
                    </Text>
                    <Text style={{ fontSize: screens.xs ? 12 : 14 }}>
                      <strong>Location:</strong> {item.location}
                    </Text>
                  </Space>
                }
              />
              <Button size={screens.xs ? "small" : "middle"}>Register</Button>
            </List.Item>
          )}
        />
      </Card>

      {/* PGCC Facts */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>PGCC at a Glance</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: "center" }} bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <BankOutlined style={{ fontSize: screens.xs ? 36 : 48, color: "#1890ff", marginBottom: 16 }} />
            <Title level={screens.xs ? 4 : 3}>1958</Title>
            <Text style={{ fontSize: screens.xs ? 12 : 14 }}>Year Founded</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: "center" }} bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <TeamOutlined style={{ fontSize: screens.xs ? 36 : 48, color: "#1890ff", marginBottom: 16 }} />
            <Title level={screens.xs ? 4 : 3}>13,000+</Title>
            <Text style={{ fontSize: screens.xs ? 12 : 14 }}>Students Enrolled</Text>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card style={{ textAlign: "center" }} bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <TrophyOutlined style={{ fontSize: screens.xs ? 36 : 48, color: "#1890ff", marginBottom: 16 }} />
            <Title level={screens.xs ? 4 : 3}>100+</Title>
            <Text style={{ fontSize: screens.xs ? 12 : 14 }}>Academic Programs</Text>
          </Card>
        </Col>
      </Row>

      {/* About VSS Time Management App */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>About VSS Time Management App</Title>
      </Divider>
      <Row gutter={[16, 24]} align="middle">
        <Col xs={24} md={12}>
          <div style={{ 
            width: "100%", 
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="VSS App Screenshot"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Title level={screens.xs ? 4 : 3}>Improve Your Time Management Skills</Title>
          <Paragraph style={{ fontSize: screens.xs ? 14 : 16 }}>
            The VSS Time Management App is designed to help PGCC students improve
            their time management skills, which is crucial for success in both
            academic and personal life.
          </Paragraph>
          <Paragraph style={{ fontSize: screens.xs ? 14 : 16 }}>
            Based on extensive research, our app provides practical tools and
            techniques to help you:
          </Paragraph>
          <ul style={{ fontSize: screens.xs ? 14 : 16, paddingLeft: screens.xs ? 20 : 40 }}>
            <li>Track how you spend your time</li>
            <li>Set priorities for academic and personal tasks</li>
            <li>Create effective schedules</li>
            <li>Reduce procrastination</li>
            <li>Balance school, work, and personal life</li>
          </ul>
          {isAuthenticated ? (
            <Button 
              type="primary" 
              size={screens.xs ? "middle" : "large"} 
              style={{ marginTop: 16 }}
              onClick={goToDashboard}
            >
              Access Your Dashboard
            </Button>
          ) : (
            <Button type="primary" size={screens.xs ? "middle" : "large"} style={{ marginTop: 16 }}>
              <Link to="/register">Get Started Now</Link>
            </Button>
          )}
        </Col>
      </Row>

      {/* PGCC Campus Information */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>Campus Information</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Card 
            title={<div style={{ fontSize: screens.xs ? 14 : 16 }}>Main Campus</div>} 
            style={{ height: "100%" }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
          >
            <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
              <strong>Largo Campus</strong>
              <br />
              301 Largo Road
              <br />
              Largo, MD 20774
              <br />
              <br />
              <strong>Phone:</strong> 301-546-7422
            </Paragraph>
            <Button 
              type="primary" 
              size={screens.xs ? "small" : "middle"}
              href="https://www.pgcc.edu/about-pgcc/locations/" 
              target="_blank"
            >
              View Map
            </Button>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title={<div style={{ fontSize: screens.xs ? 14 : 16 }}>Hours of Operation</div>} 
            style={{ height: "100%" }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
          >
            <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
              <strong>Monday - Thursday:</strong> 8:00 AM - 8:00 PM
              <br />
              <strong>Friday:</strong> 8:00 AM - 5:00 PM
              <br />
              <strong>Saturday:</strong> 9:00 AM - 1:00 PM
              <br />
              <strong>Sunday:</strong> Closed
              <br />
              <br />
              <Text type="secondary" style={{ fontSize: screens.xs ? 11 : 12 }}>
                Hours may vary during holidays and breaks
              </Text>
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            title={<div style={{ fontSize: screens.xs ? 14 : 16 }}>Contact VSS</div>} 
            style={{ height: "100%" }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
          >
            <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
              <strong>Location:</strong> Largo Student Center, Room 205
              <br />
              <strong>Phone:</strong> (301) 546-0865
              <br />
              <strong>Email:</strong> vss@pgcc.edu
              <br />
              <br />
              <strong>Advisor Hours:</strong> Monday-Friday, 9:00 AM - 4:00 PM
            </Paragraph>
            <Button type="primary" size={screens.xs ? "small" : "middle"}>
              Schedule an Appointment
            </Button>
          </Card>
        </Col>
      </Row>

      {/* PGCC Quick Links */}
      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 40px" }}>
        <Title level={screens.xs ? 3 : 2}>Quick Links</Title>
      </Divider>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card hoverable bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <Space direction="vertical" align="center" style={{ width: "100%" }}>
              <BookOutlined style={{ fontSize: screens.xs ? 24 : 32, color: "#1890ff" }} />
              <Text strong style={{ fontSize: screens.xs ? 12 : 14 }}>Academic Calendar</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card hoverable bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <Space direction="vertical" align="center" style={{ width: "100%" }}>
              <TeamOutlined style={{ fontSize: screens.xs ? 24 : 32, color: "#1890ff" }} />
              <Text strong style={{ fontSize: screens.xs ? 12 : 14 }}>Student Services</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card hoverable bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <Space direction="vertical" align="center" style={{ width: "100%" }}>
              <ToolOutlined style={{ fontSize: screens.xs ? 24 : 32, color: "#1890ff" }} />
              <Text strong style={{ fontSize: screens.xs ? 12 : 14 }}>Career Services</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card hoverable bodyStyle={{ padding: screens.xs ? 12 : 24 }}>
            <Space direction="vertical" align="center" style={{ width: "100%" }}>
              <GlobalOutlined style={{ fontSize: screens.xs ? 24 : 32, color: "#1890ff" }} />
              <Text strong style={{ fontSize: screens.xs ? 12 : 14 }}>PGCC Website</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: screens.xs ? "40px 0 20px" : "60px 0 20px" }} />
      <footer style={{ textAlign: "center", padding: "20px 0" }}>
        <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>
          © 2025 Vocational Support Services at Prince George's Community College. All rights reserved.
        </Paragraph>
        <Space 
          split={<Divider type="vertical" />} 
          size={screens.xs ? 4 : 8}
          wrap
          style={{ justifyContent: "center" }}
        >
          <Link to="/privacy" style={{ fontSize: screens.xs ? 12 : 14 }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: screens.xs ? 12 : 14 }}>Terms of Service</Link>
          <Link to="/accessibility" style={{ fontSize: screens.xs ? 12 : 14 }}>Accessibility</Link>
          <Link to="/help" style={{ fontSize: screens.xs ? 12 : 14 }}>Help Center</Link>
        </Space>
      </footer>

      {/* Video Modal */}
      <Modal
        title={selectedVideo?.title}
        open={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={null}
        width={screens.xs ? "95%" : screens.sm ? "80%" : 800}
        centered
      >
        {selectedVideo && (
          <>
            <YouTubeEmbed youtubeId={selectedVideo.youtubeId} height={screens.xs ? "200px" : "400px"} />
            <div style={{ marginTop: 16 }}>
              <Title level={screens.xs ? 5 : 4}>{selectedVideo.title}</Title>
              <Paragraph style={{ fontSize: screens.xs ? 12 : 14 }}>{selectedVideo.description}</Paragraph>
              <Space size={screens.xs ? "small" : "middle"} wrap>
                <Tag color="blue">PGCC</Tag>
                <Tag color="green">Campus Life</Tag>
                <Tag color="orange">Student Resources</Tag>
              </Space>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Welcome;

