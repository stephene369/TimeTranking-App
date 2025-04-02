import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Progress, 
  List, 
  Typography, 
  Tag, 
  Calendar, 
  Badge,
  Button,
  Space,
  Divider
} from 'antd';
import { 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  BookOutlined,
  RiseOutlined,
  CalendarOutlined,
  FireOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

// Mock data
const upcomingTasks = [
  { 
    id: 1, 
    title: 'Complete Math Assignment', 
    dueDate: '2023-11-25', 
    priority: 'high',
    category: 'Homework'
  },
  { 
    id: 2, 
    title: 'Read Chapters 7-8', 
    dueDate: '2023-11-24', 
    priority: 'medium',
    category: 'Reading'
  },
  { 
    id: 3, 
    title: 'Research Paper Outline', 
    dueDate: '2023-11-28', 
    priority: 'high',
    category: 'Project'
  },
];

const recentTimeEntries = [
  { 
    id: 1, 
    activity: 'Math Homework', 
    category: 'Academic', 
    date: '2023-11-22', 
    duration: '2h 15m',
  },
  { 
    id: 2, 
    activity: 'Reading Assignment', 
    category: 'Academic', 
    date: '2023-11-22', 
    duration: '1h 45m',
  },
  { 
    id: 3, 
    activity: 'Research for Project', 
    category: 'Academic', 
    date: '2023-11-21', 
    duration: '3h 30m',
  },
];

const weeklyData = [
  { day: 'Mon', hours: 3.5 },
  { day: 'Tue', hours: 5.2 },
  { day: 'Wed', hours: 4.0 },
  { day: 'Thu', hours: 6.5 },
  { day: 'Fri', hours: 4.8 },
  { day: 'Sat', hours: 2.0 },
  { day: 'Sun', hours: 1.5 },
];

const calendarEvents = [
  { date: '2023-11-24', type: 'task', content: 'Read Chapters 7-8' },
  { date: '2023-11-25', type: 'task', content: 'Complete Math Assignment' },
  { date: '2023-11-28', type: 'task', content: 'Research Paper Outline' },
  { date: '2023-11-30', type: 'event', content: 'Group Project Meeting' },
  { date: '2023-12-05', type: 'event', content: 'Midterm Exam' },
];

const Dashboard = () => {
  // Calculate total hours for the week
  const totalWeeklyHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  
  // Get today's date
  const today = dayjs().format('YYYY-MM-DD');
  
  // Calendar cell renderer
  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const eventsForDate = calendarEvents.filter(event => event.date === dateStr);
    
    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {eventsForDate.map((event, index) => (
            <li key={index}>
              <Badge 
                status={event.type === 'task' ? 'processing' : 'warning'} 
                text={<Text ellipsis style={{ fontSize: '12px' }}>{event.content}</Text>} 
              />
            </li>
          ))}
        </ul>
      );
    };
  
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Title level={4}>Student Dashboard</Title>
              <Text>Welcome back! Here's an overview of your academic progress and upcoming tasks.</Text>
            </Card>
          </Col>
          
          <Col span={24}>
            <Card>
              <Statistic 
                title="Total Study Hours" 
                value={totalWeeklyHours.toFixed(1)} 
                prefix={<ClockCircleOutlined />} 
                suffix="hrs this week" 
              />
              <Progress percent={Math.round((totalWeeklyHours / 30) * 100)} status="active" />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card>
              <Statistic 
                title="Tasks Completed" 
                value={12} 
                prefix={<CheckCircleOutlined />} 
                suffix="/ 15" 
              />
              <Progress percent={80} status="success" />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card>
              <Statistic 
                title="Current Streak" 
                value={5} 
                prefix={<FireOutlined />} 
                suffix="days" 
                valueStyle={{ color: '#cf1322' }}
              />
              <Text type="secondary">Keep up the good work!</Text>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card>
              <Statistic 
                title="Productivity Score" 
                value={87} 
                prefix={<RiseOutlined />} 
                suffix="/ 100" 
                valueStyle={{ color: '#3f8600' }}
              />
              <Progress percent={87} strokeColor="#3f8600" />
            </Card>
          </Col>
          
          {/* Weekly Activity Chart */}
          <Col xs={24} md={12}>
            <Card title="Weekly Activity">
              <div style={{ height: 200, display: 'flex', alignItems: 'flex-end' }}>
                {weeklyData.map((day, index) => (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      height: `${(day.hours / 8) * 150}px`, 
                      width: '60%', 
                      backgroundColor: day.day === dayjs().format('ddd') ? '#1890ff' : '#8cc8ff',
                      borderRadius: '3px 3px 0 0',
                      minHeight: 4
                    }} />
                    <div style={{ marginTop: 8 }}>
                      <Text strong={day.day === dayjs().format('ddd')}>{day.day}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{day.hours}h</Text>
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>Weekly Goal: 30 hours</Text>
                <Text strong>{totalWeeklyHours.toFixed(1)} / 30 hours</Text>
              </div>
              <Progress percent={Math.round((totalWeeklyHours / 30) * 100)} status="active" />
            </Card>
          </Col>
          
          {/* Upcoming Tasks */}
          <Col xs={24} md={12}>
            <Card 
              title="Upcoming Tasks" 
              extra={<Link to="/student/tasks">View All</Link>}
            >
              <List
                itemLayout="horizontal"
                dataSource={upcomingTasks}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Tag color={
                        item.priority === 'high' ? 'red' :
                        item.priority === 'medium' ? 'orange' : 'green'
                      }>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                      </Tag>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge 
                          status={
                            dayjs(item.dueDate).diff(dayjs(), 'day') <= 1 ? 'error' :
                            dayjs(item.dueDate).diff(dayjs(), 'day') <= 3 ? 'warning' : 'default'
                          } 
                        />
                      }
                      title={item.title}
                      description={
                        <Space>
                          <CalendarOutlined />
                          <span>Due: {item.dueDate}</span>
                          <Tag color={
                            item.category === 'Homework' ? 'blue' :
                            item.category === 'Reading' ? 'green' :
                            item.category === 'Project' ? 'purple' : 'default'
                          }>
                            {item.category}
                          </Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Button type="primary">
                  <Link to="/student/tasks">Add New Task</Link>
                </Button>
              </div>
            </Card>
          </Col>
          
          {/* Recent Time Entries */}
          <Col xs={24} md={12}>
            <Card 
              title="Recent Time Entries" 
              extra={<Link to="/student/time-tracker">View All</Link>}
            >
              <List
                itemLayout="horizontal"
                dataSource={recentTimeEntries}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Text strong>{item.duration}</Text>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<ClockCircleOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                      title={item.activity}
                      description={
                        <Space>
                          <span>{item.date}</span>
                          <Tag color={
                            item.category === 'Academic' ? 'blue' :
                            item.category === 'Exercise' ? 'green' :
                            item.category === 'Work' ? 'orange' : 'default'
                          }>
                            {item.category}
                          </Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <Button type="primary">
                  <Link to="/student/time-tracker">Track Time Now</Link>
                </Button>
              </div>
            </Card>
          </Col>
          
          {/* Calendar */}
          <Col xs={24} md={12}>
            <Card 
              title="Calendar" 
              extra={<Link to="/student/tasks">View All Events</Link>}
            >
              <Calendar 
                fullscreen={false} 
                dateCellRender={dateCellRender}
              />
            </Card>
          </Col>
          
          {/* Resources */}
          <Col span={24}>
            <Card 
              title="Recommended Resources" 
              extra={<Link to="/student/resources">View All</Link>}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card hoverable>
                    <Space direction="vertical">
                      <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                      <Title level={5}>Time Management Techniques</Title>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        Learn effective strategies to manage your study time and improve productivity.
                      </Paragraph>
                      <Button type="link" style={{ padding: 0 }}>Read More</Button>
                    </Space>
                  </Card>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Card hoverable>
                    <Space direction="vertical">
                      <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                      <Title level={5}>Effective Note-Taking</Title>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        Discover methods to take better notes and retain information more effectively.
                      </Paragraph>
                      <Button type="link" style={{ padding: 0 }}>Read More</Button>
                    </Space>
                  </Card>
                </Col>
                
                <Col xs={24} sm={8}>
                  <Card hoverable>
                    <Space direction="vertical">
                      <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                      <Title level={5}>Stress Management</Title>
                      <Paragraph ellipsis={{ rows: 2 }}>
                        Learn techniques to manage academic stress and maintain a healthy work-life balance.
                      </Paragraph>
                      <Button type="link" style={{ padding: 0 }}>Read More</Button>
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default Dashboard;
  