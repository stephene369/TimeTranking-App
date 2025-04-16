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
  Empty,
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
  PlayCircleOutlined,
} from "@ant-design/icons";

import { resourcesData, resourceCategories, resourceTypes } from "../../data/resourcesData";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const YouTubeEmbed = ({ youtubeId, autoplay = false, height = "100%" }) => {
  const src = `https://www.youtube.com/embed/${youtubeId}${autoplay ? '?autoplay=1' : ''}`;
  return (
    <div style={{ position: "relative", width: "100%", height, paddingTop: height === "100%" ? "56.25%" : 0 }}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const PDFPreview = ({ pdfUrl, height = "100%" }) => {
  return (
    <div style={{ position: "relative", width: "100%", height, paddingTop: height === "100%" ? "56.25%" : 0 }}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
        title="PDF Preview"
      ></iframe>
    </div>
  );
};

const ArticleIcon = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100%", 
      backgroundColor: "#f0f2f5" 
    }}>
      <BookOutlined style={{ fontSize: 64, color: "#1890ff" }} />
    </div>
  );
};

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  // Filter resources by search term and category
  const filteredResources = resourcesData.filter(
    (resource) => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }
  );

  // Render card cover based on resource type
  const renderCardCover = (resource) => {
    switch (resource.type) {
      case "video":
        return (
          <div style={{ height: 180, position: "relative" }}>
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}>
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <PlayCircleOutlined style={{ fontSize: 48, color: "white" }} />
              </div>
              <Tag
                color={getColorForResourceType(resource.type)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  textTransform: "capitalize",
                }}
              >
                {getIconForResourceType(resource.type)} {resource.type}
              </Tag>
            </div>
          </div>
        );
      case "pdf":
        return (
          <div style={{ height: 180, position: "relative" }}>
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <FileOutlined style={{ fontSize: 48, color: "white" }} />
              </div>
              <Tag
                color={getColorForResourceType(resource.type)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  textTransform: "capitalize",
                }}
              >
                {getIconForResourceType(resource.type)} {resource.type}
              </Tag>
            </div>
          </div>
        );
      case "article":
        return (
          <div style={{ height: 180, position: "relative" }}>
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: "100%", 
              height: "100%", 
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <BookOutlined style={{ fontSize: 48, color: "white" }} />
              </div>
              <Tag
                color={getColorForResourceType(resource.type)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  textTransform: "capitalize",
                }}
              >
                {getIconForResourceType(resource.type)} {resource.type}
              </Tag>
            </div>
          </div>
        );
      default:
        return (
          <div
            style={{
              height: 180,
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Tag
              color={getColorForResourceType(resource.type)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                textTransform: "capitalize",
              }}
            >
              {getIconForResourceType(resource.type)} {resource.type}
            </Tag>
          </div>
        );
    }
  };

  // Render modal content based on resource type
  const renderModalContent = (resource) => {
    switch (resource.type) {
      case "video":
        return (
          <div style={{ marginBottom: 16 }}>
            <YouTubeEmbed youtubeId={resource.youtubeId} height="400px" />
          </div>
        );
      case "pdf":
        return (
          <div style={{ marginBottom: 16 }}>
            <PDFPreview pdfUrl={resource.url} height="400px" />
          </div>
        );
      case "article":
        return (
          <div
            style={{
              height: 240,
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 4,
              marginBottom: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BookOutlined style={{ fontSize: 64, color: "white" }} />
          </div>
        );
      default:
        return (
          <div
            style={{
              height: 240,
              background: `url(${resource.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 4,
              marginBottom: 16,
            }}
          />
        );
    }
  };

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
            <Tabs 
              defaultActiveKey="all" 
              onChange={(key) => setSelectedCategory(key)}
            >
              <TabPane tab="All Resources" key="all" />
              {resourceCategories.map((category) => (
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
            locale={{ emptyText: <Empty description="No resources found" /> }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={renderCardCover(item)}
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
            {selectedResource?.type === "pdf" ? "Download PDF" : "Access Resource"}
          </Button>,
        ]}
        width={800}
      >
        {selectedResource && (
          <>
            {renderModalContent(selectedResource)}

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
