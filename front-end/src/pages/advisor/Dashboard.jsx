import React, { useState } from 'react';
import { Typography, Row, Col, Card, Statistic, Table, Button, Space, Select, Tag, Avatar, List, Divider } from 'antd';
import { UserOutlined, TeamOutlined, ClockCircleOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const AdvisorDashboard = () => {
  const { currentUser } = useAuth();
  const [programFilter, setProgramFilter] = useState('all');
  
  // Données simulées pour le tableau de bord conseiller
  const stats = {
    totalStudents: 124,
    activeStudents: 98,
    atRiskStudents: 15,
    upcomingAppointments: 8
  };
  
  const programs = [
    'All Programs',
    'Computer Science',
    'Nursing',
    'Business Administration',
    'Automotive Technology',
    'Culinary Arts'
  ];
  
  const students = [
    { id: 1, name: 'John Doe', program: 'Computer Science', status: 'active', riskLevel: 'low', lastActive: '2023-10-12', avgHoursWeek: 22.5 },
    { id: 2, name: 'Jane Smith', program: 'Nursing', status: 'active', riskLevel: 'medium', lastActive: '2023-10-10', avgHoursWeek: 15.2 },
    { id: 3, name: 'Mike Johnson', program: 'Business Administration', status: 'inactive', riskLevel: 'high', lastActive: '2023-09-28', avgHoursWeek: 8.5 },
    { id: 4, name: 'Sarah Williams', program: 'Computer Science', status: 'active', riskLevel: 'low', lastActive: '2023-10-11', avgHoursWeek: 19.8 },
    { id: 5, name: 'Robert Brown', program: 'Automotive Technology', status: 'active', riskLevel: 'high', lastActive: '2023-10-05', avgHoursWeek: 10.3 },
  ];
  
  const appointments = [
    { id: 1, student: 'Jane Smith', program: 'Nursing', date: '2023-10-15', time: '10:00 AM', type: 'Academic Advising' },
    { id: 2, student: 'Robert Brown', program: 'Automotive Technology', date: '2023-10-15', time: '2:30 PM', type: 'Career Planning' },
    { id: 3, student: 'Mike Johnson', program: 'Business Administration', date: '2023-10-16', time: '11:00 AM', type: 'Academic Intervention' },
    { id: 4, student: 'Sarah Williams', program: 'Computer Science', date: '2023-10-17', time: '9:15 AM', type: 'Academic Advising' },
  ];
  
  const workshops = [
    { id: 1, title: 'Effective Time Management', date: '2023-10-15', registered: 18, capacity: 25 },
    { id: 2, title: 'Resume Building Workshop', date: '2023-10-22', registered: 12, capacity: 20 },
    { id: 3, title: 'Interview Skills', date: '2023-11-05', registered: 8, capacity: 15 },
  ];
  
  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'volcano';
      default: return 'default';
    }
  };
  
  const columns = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level) => (
        <Tag color={getRiskLevelColor(level)}>
          {level.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Avg. Hours/Week',
      dataIndex: 'avgHoursWeek',
      key: 'avgHoursWeek',
      render: (hours) => `${hours} hrs`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Contact</Button>
        </Space>
      ),
    },
  ];
  
  const filteredStudents = programFilter === 'all' 
    ? students 
    : students.filter(s => s.program === programFilter);
  
  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Advisor Dashboard</Title>
      <Paragraph>Welcome back, {currentUser.firstName}! Here's an overview of your students and upcoming appointments.</Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Students"
              value={stats.totalStudents}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Students"
              value={stats.activeStudents}
              valueStyle={{ color: '#52c41a' }}
              prefix={<UserOutlined />}
              suffix={`/ ${stats.totalStudents}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="At-Risk Students"
              value={stats.atRiskStudents}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Upcoming Appointments"
              value={stats.upcomingAppointments}
              valueStyle={{ color: '#722ed1' }}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      <Card 
        title="Student Overview" 
        style={{ marginTop: '24px' }}
        extra={
          <Select 
            defaultValue="all" 
            style={{ width: 200 }} 
            onChange={value => setProgramFilter(value)}
          >
            {programs.map((program, index) => (
              <Option key={index} value={index === 0 ? 'all' : program}>
                {program}
              </Option>
            ))}
          </Select>
        }
      >
        <Table 
          dataSource={filteredStudents} 
          columns={columns} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
      
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Upcoming Appointments" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={appointments}
              renderItem={appointment => (
                <List.Item
                  actions={[
                    <Button type="link" size="small">Reschedule</Button>,
                    <Button type="link" size="small">Cancel</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={appointment.student}
                    description={
                      <>
                        <div>{appointment.program}</div>
                        <div>
                          {dayjs(appointment.date).format('MMM D, YYYY')} at {appointment.time}
                        </div>
                        <Tag color="blue">{appointment.type}</Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Upcoming Workshops" extra={<Button type="link">Manage Workshops</Button>}>
            <List
              dataSource={workshops}
              renderItem={workshop => (
                <List.Item
                  actions={[
                    <Button type="link" size="small">Edit</Button>,
                    <Button type="link" size="small">View Registrations</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<FileOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                    title={workshop.title}
                    description={
                      <>
                        <div>{dayjs(workshop.date).format('MMM D, YYYY')}</div>
                        <div>
                          Registration: {workshop.registered}/{workshop.capacity}
                        </div>
                        <div>
                          <Progress 
                            percent={Math.round((workshop.registered / workshop.capacity) * 100)} 
                            size="small" 
                            style={{ marginTop: 8 }}
                          />
                        </div>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
      <Card title="Quick Actions" style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Button type="primary" icon={<UserOutlined />} block>
              Add New Student
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button icon={<CalendarOutlined />} block>
              Schedule Appointment
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button icon={<FileOutlined />} block>
              Create Workshop
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdvisorDashboard;
