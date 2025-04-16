import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Select, 
  DatePicker, 
  Button, 
  Typography, 
  Table, 
  Statistic, 
  Divider,
  Tabs
} from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  DownloadOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  PieChartOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// Static data for simulation
const timeData = [
  { day: 'Monday', academic: 4.5, personal: 1.2, work: 0 },
  { day: 'Tuesday', academic: 3.8, personal: 0.5, work: 2 },
  { day: 'Wednesday', academic: 5.2, personal: 1.0, work: 0 },
  { day: 'Thursday', academic: 2.5, personal: 2.0, work: 1.5 },
  { day: 'Friday', academic: 3.0, personal: 3.0, work: 0 },
  { day: 'Saturday', academic: 1.5, personal: 4.0, work: 0 },
  { day: 'Sunday', academic: 2.0, personal: 3.5, work: 0 },
];

const categoryData = [
  { name: 'Academic', value: 22.5, color: '#1890ff' },
  { name: 'Personal', value: 15.2, color: '#52c41a' },
  { name: 'Work', value: 3.5, color: '#fa8c16' },
  { name: 'Exercise', value: 4.0, color: '#722ed1' },
  { name: 'Workshop', value: 2.0, color: '#13c2c2' },
];

const COLORS = ['#1890ff', '#52c41a', '#fa8c16', '#722ed1', '#13c2c2'];

const taskCompletionData = [
  { name: 'Completed', value: 24, color: '#52c41a' },
  { name: 'Pending', value: 8, color: '#faad14' },
];

const timeEntries = [
  { 
    id: 1, 
    activity: 'Math Homework', 
    category: 'Academic', 
    date: '2025-11-22', 
    duration: '2h 15m',
  },
  { 
    id: 2, 
    activity: 'Reading Assignment', 
    category: 'Academic', 
    date: '2025-11-22', 
    duration: '1h 45m',
  },
  { 
    id: 3, 
    activity: 'Research for Project', 
    category: 'Academic', 
    date: '2025-11-21', 
    duration: '3h 30m',
  },
  { 
    id: 4, 
    activity: 'Time Management Workshop', 
    category: 'Workshop', 
    date: '2025-11-20', 
    duration: '1h 00m',
  },
  { 
    id: 5, 
    activity: 'Gym Workout', 
    category: 'Exercise', 
    date: '2025-11-20', 
    duration: '1h 30m',
  },
  { 
    id: 6, 
    activity: 'Part-time Job', 
    category: 'Work', 
    date: '2025-11-19', 
    duration: '3h 30m',
  },
  { 
    id: 7, 
    activity: 'Group Study Session', 
    category: 'Academic', 
    date: '2025-11-19', 
    duration: '2h 45m',
  },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [reportType, setReportType] = useState('time');
  const [activeTab, setActiveTab] = useState('charts');

  // Table columns for time entries
  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(b.date) - new Date(a.date),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
  ];

  // Calculate total hours
  const totalHours = categoryData.reduce((sum, item) => sum + item.value, 0);
  
  // Generate PDF report (simulated)
  const generateReport = () => {
    console.log('Generating report for:', reportType, dateRange);
    // In a real application, this would generate and download a PDF
    alert('Report generation simulated. In a real application, this would download a PDF report.');
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Time Management Reports</Title>
            <Text>Analyze your time usage and productivity patterns.</Text>
          </Card>
        </Col>
        
        {/* Report Controls */}
        <Col span={24}>
          <Card>
            <Row gutter={16} align="middle">
              <Col xs={24} md={6}>
                <Text strong>Report Type:</Text>
                <Select
                  style={{ width: '100%', marginTop: 8 }}
                  value={reportType}
                  onChange={setReportType}
                >
                  <Option value="time">Time Usage</Option>
                  <Option value="tasks">Task Completion</Option>
                  <Option value="productivity">Productivity</Option>
                </Select>
              </Col>
              
              <Col xs={24} md={10}>
                <Text strong>Date Range:</Text>
                <RangePicker 
                  style={{ width: '100%', marginTop: 8 }} 
                  value={dateRange}
                  onChange={setDateRange}
                />
              </Col>
              
              <Col xs={24} md={8}>
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />} 
                  onClick={generateReport}
                  style={{ marginTop: 32 }}
                  block
                >
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Report Content */}
        <Col span={24}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane 
                tab={
                  <span>
                    <BarChartOutlined />
                    Charts
                  </span>
                } 
                key="charts"
              >
                <Row gutter={[16, 24]}>
                  {/* Time Usage Statistics */}
                  <Col span={24}>
                    <Title level={4}>Time Usage Overview</Title>
                    <Divider />
                  </Col>
                  
                  <Col xs={24} sm={8}>
                    <Statistic 
                      title="Total Hours Tracked" 
                      value={totalHours} 
                      precision={1}
                      suffix="hours"
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Col>
                  
                  <Col xs={24} sm={8}>
                    <Statistic 
                      title="Academic Hours" 
                      value={categoryData.find(c => c.name === 'Academic')?.value} 
                      precision={1}
                      suffix="hours"
                      valueStyle={{ color: '#1890ff' }}
                    />
                    <Text type="secondary">
                      {Math.round((categoryData.find(c => c.name === 'Academic')?.value / totalHours) * 100)}% of total
                    </Text>
                  </Col>
                  
                  <Col xs={24} sm={8}>
                    <Statistic 
                      title="Most Productive Day" 
                      value="Wednesday"
                      valueStyle={{ color: '#52c41a' }}
                    />
                    <Text type="secondary">5.2 hours of academic work</Text>
                  </Col>
                  
                  {/* Time Distribution by Day */}
                  <Col span={24}>
                    <Title level={5}>Daily Time Distribution</Title>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart
                          data={timeData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                          <Tooltip formatter={(value) => [`${value} hours`, null]} />
                          <Legend />
                          <Bar dataKey="academic" name="Academic" stackId="a" fill="#1890ff" />
                          <Bar dataKey="personal" name="Personal" stackId="a" fill="#52c41a" />
                          <Bar dataKey="work" name="Work" stackId="a" fill="#fa8c16" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  
                  {/* Time Distribution by Category */}
                  <Col xs={24} md={12}>
                    <Title level={5}>Time Distribution by Category</Title>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} hours`, null]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  
                  {/* Task Completion */}
                  <Col xs={24} md={12}>
                    <Title level={5}>Task Completion Status</Title>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={taskCompletionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {taskCompletionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} tasks`, null]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <ClockCircleOutlined />
                    Time Entries
                  </span>
                } 
                key="entries"
              >
                <Table 
                  columns={columns} 
                  dataSource={timeEntries} 
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
