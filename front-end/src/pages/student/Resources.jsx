import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Button,
  List,
  Tag,
  Space,
  Tabs,
  Divider,
  Rate,
  Avatar,
  Tooltip,
  Modal,
} from "antd";
import {
  SearchOutlined,
  BookOutlined,
  VideoCameraOutlined,
  FileOutlined,
  LinkOutlined,
  DownloadOutlined,
  StarOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

// Mock data
const resources = [
  {
    id: 1,
    title: "Effective Time Management for Students",
    type: "article",
    category: "Time Management",
    description:
      "Learn how to manage your study time effectively and increase productivity.",
    author: "Dr. Sarah Johnson",
    rating: 4.5,
    reviews: 28,
    date: "2023-10-15",
    tags: ["productivity", "time management", "study skills"],
    url: "#",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Note-Taking Strategies for Academic Success",
    type: "video",
    category: "Study Skills",
    description:
      "Discover effective note-taking methods to improve retention and understanding.",
    author: "Prof. Michael Brown",
    rating: 4.8,
    reviews: 42,
    date: "2023-09-22",
    tags: ["note-taking", "study skills", "academic"],
    duration: "32:15",
    url: "#",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Pomodoro Technique Explained",
    type: "article",
    category: "Time Management",
    description:
      "A detailed guide to implementing the Pomodoro Technique for better focus and productivity.",
    author: "Emma Wilson",
    rating: 4.2,
    reviews: 15,
    date: "2023-11-05",
    tags: ["pomodoro", "focus", "productivity"],
    url: "#",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    title: "Stress Management During Exam Period",
    type: "pdf",
    category: "Wellness",
    description: "Strategies to manage stress and anxiety during exam periods.",
    author: "Dr. Robert Chen",
    rating: 4.7,
    reviews: 33,
    date: "2023-08-18",
    tags: ["stress", "exams", "mental health"],
    url: "#",
    fileSize: "2.4 MB",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    title: "How to Create an Effective Study Schedule",
    type: "video",
    category: "Planning",
    description:
      "Step-by-step guide to creating a personalized study schedule that works for you.",
    author: "Lisa Taylor",
    rating: 4.6,
    reviews: 51,
    date: "2023-10-30",
    tags: ["schedule", "planning", "organization"],
    duration: "28:45",
    url: "#",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    title: "Memory Techniques for Students",
    type: "article",
    category: "Study Skills",
    description:
      "Learn powerful memory techniques to improve retention and recall for exams.",
    author: "Prof. David Miller",
    rating: 4.4,
    reviews: 19,
    date: "2023-09-12",
    tags: ["memory", "study skills", "exams"],
    url: "#",
    image: "https://via.placeholder.com/300x200",
  },
];

const categories = [
  "Time Management",
  "Study Skills",
  "Planning",
  "Wellness",
  "Technology",
  "Academic Writing",
  "Research Skills",
];

const resourceTypes = ["article", "video", "pdf", "tool", "template"];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const showResourceDetails = (resource) => {
    setSelectedResource(resource);
    setIsModalVisible(true);
  };

  const getIconForResourceType = (type) => {
    switch (type) {
      case "article":
        return <BookOutlined />;
      case "video":
        return <VideoCameraOutlined />;
      case "pdf":
        return <FileOutlined />;
      default:
        return <LinkOutlined />;
    }
  };

  const getColorForResourceType = (type) => {
    switch (type) {
      case "article":
        return "blue";
      case "video":
        return "red";
      case "pdf":
        return "orange";
      case "tool":
        return "green";
      case "template":
        return "purple";
      default:
        return "default";
    }
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Learning Resources</Title>
            <Text>
              Discover resources to help you improve your academic skills and
              productivity.
            </Text>
          </Card>
        </Col>

        {/* Search and Filters */}
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col xs={24} md={16}>
                <Search
                  placeholder="Search resources by title, description, or tags"
                  allowClear
                  enterButton={
                    <>
                      <SearchOutlined /> Search
                    </>
                  }
                  size="large"
                  onSearch={handleSearch}
                />
              </Col>
              <Col
                xs={24}
                md={8}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Space>
                  <Tooltip title="Filter Resources">
                    <Button icon={<FilterOutlined />} size="large">
                      Filter
                    </Button>
                  </Tooltip>
                  <Tooltip title="Sort Resources">
                    <Button icon={<SortAscendingOutlined />} size="large">
                      Sort
                    </Button>
                  </Tooltip>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Resource Categories */}
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="all">
              <TabPane tab="All Resources" key="all" />
              {categories.map((category) => (
                <TabPane tab={category} key={category} />
              ))}
            </Tabs>
          </Card>
        </Col>

        {/* Resource List */}
        <Col span={24}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={filteredResources}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        height: 160,
                        background: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                      }}
                    >
                      <Tag
                        color={getColorForResourceType(item.type)}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          textTransform: "capitalize",
                        }}
                      >
                        {getIconForResourceType(item.type)} {item.type}
                      </Tag>
                    </div>
                  }
                  onClick={() => showResourceDetails(item)}
                >
                  <Card.Meta
                    title={item.title}
                    description={
                      <>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ marginBottom: 8 }}
                        >
                          {item.description}
                        </Paragraph>
                        <Space
                          direction="vertical"
                          size={4}
                          style={{ width: "100%" }}
                        >
                          <div>
                            <Text type="secondary">Category: </Text>
                            <Tag>{item.category}</Tag>
                          </div>
                          <div>
                            <Space>
                              <Rate
                                disabled
                                defaultValue={item.rating}
                                style={{ fontSize: 12 }}
                              />
                              <Text type="secondary">
                                ({item.reviews} reviews)
                              </Text>
                            </Space>
                          </div>
                          <div>
                            <Space size={[0, 8]} wrap>
                              {item.tags.map((tag) => (
                                <Tag key={tag} style={{ marginBottom: 4 }}>
                                  #{tag}
                                </Tag>
                              ))}
                            </Space>
                          </div>
                        </Space>
                      </>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>

      {/* Resource Detail Modal */}
      <Modal
        title={selectedResource?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button
            key="access"
            type="primary"
            icon={
              selectedResource?.type === "pdf" ? (
                <DownloadOutlined />
              ) : (
                <LinkOutlined />
              )
            }
            href={selectedResource?.url}
            target="_blank"
          >
            {selectedResource?.type === "pdf" ? "Download" : "Access Resource"}
          </Button>,
        ]}
        width={700}
      >
        {selectedResource && (
          <>
            <div
              style={{
                height: 240,
                background: `url(${selectedResource.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 4,
                marginBottom: 16,
              }}
            />

            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Paragraph>{selectedResource.description}</Paragraph>

                <Divider />

                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <div>
                    <Text strong>Category: </Text>
                    <Tag>{selectedResource.category}</Tag>
                  </div>

                  <div>
                    <Text strong>Type: </Text>
                    <Tag color={getColorForResourceType(selectedResource.type)}>
                      {getIconForResourceType(selectedResource.type)}{" "}
                      {selectedResource.type}
                    </Tag>
                  </div>

                  {selectedResource.duration && (
                    <div>
                      <Text strong>Duration: </Text>
                      <Text>{selectedResource.duration}</Text>
                    </div>
                  )}

                  {selectedResource.fileSize && (
                    <div>
                      <Text strong>File Size: </Text>
                      <Text>{selectedResource.fileSize}</Text>
                    </div>
                  )}

                  <div>
                    <Text strong>Published: </Text>
                    <Text>{selectedResource.date}</Text>
                  </div>

                  <div>
                    <Text strong>Tags: </Text>
                    <div style={{ marginTop: 4 }}>
                      <Space size={[0, 8]} wrap>
                        {selectedResource.tags.map((tag) => (
                          <Tag key={tag}>#{tag}</Tag>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Space>
              </Col>

              <Col span={8}>
                <Card size="small">
                  <Space
                    direction="vertical"
                    size={12}
                    style={{ width: "100%" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Avatar size={64} icon={<UserOutlined />} />
                      <div style={{ marginTop: 8 }}>
                        <Text strong>{selectedResource.author}</Text>
                      </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <div style={{ textAlign: "center" }}>
                      <Rate disabled defaultValue={selectedResource.rating} />
                      <div>
                        <Text type="secondary">
                          {selectedResource.reviews} reviews
                        </Text>
                      </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <Button type="primary" icon={<StarOutlined />} block>
                      Save to Favorites
                    </Button>
                  </Space>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Resources;
