import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Table, 
  Tag, 
  Space, 
  Statistic, 
  Progress, 
  Tabs,
  Modal,
  Tooltip,
  Divider,
  List,
  Calendar,
  Badge
} from 'antd';
import { 
  ClockCircleOutlined, 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BarChartOutlined,
  PieChartOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SaveOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// Mock data for time entries
const initialTimeEntries = [
  {
    id: 1,
    activity: 'Math Homework',
    category: 'Academic',
    date: '2023-11-22',
    startTime: '09:30',
    endTime: '11:45',
    duration: '2h 15m',
    notes: 'Completed calculus problems 1-15',
  },
  {
    id: 2,
    activity: 'Reading Assignment',
    category: 'Academic',
    date: '2023-11-22',
    startTime: '13:15',
    endTime: '15:00',
    duration: '1h 45m',
    notes: 'Read chapters 5-6 for Literature class',
  },
  {
    id: 3,
    activity: 'Research for Project',
    category: 'Academic',
    date: '2023-11-21',
    startTime: '10:00',
    endTime: '13:30',
    duration: '3h 30m',
    notes: 'Gathered sources for history project',
  },
  {
    id: 4,
    activity: 'Group Study Session',
    category: 'Academic',
    date: '2023-11-20',
    startTime: '14:00',
    endTime: '16:30',
    duration: '2h 30m',
    notes: 'Studied with classmates for upcoming exam',
  },
  {
    id: 5,
    activity: 'Exercise',
    category: 'Physical',
    date: '2023-11-20',
    startTime: '07:00',
    endTime: '08:00',
    duration: '1h 0m',
    notes: 'Morning jog and stretching',
  },
  {
    id: 6,
    activity: 'Part-time Job',
    category: 'Work',
    date: '2023-11-19',
    startTime: '16:00',
    endTime: '20:00',
    duration: '4h 0m',
    notes: 'Shift at the campus bookstore',
  },
];

// Activity categories
const categories = [
  'Academic',
  'Reading',
  'Research',
  'Project',
  'Exercise',
  'Work',
  'Leisure',
  'Other'
];

const TimeTracker = () => {
  const [form] = Form.useForm();
  const [timeEntries, setTimeEntries] = useState(initialTimeEntries);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerActivity, setTimerActivity] = useState('');
  const [timerCategory, setTimerCategory] = useState('Academic');
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [timerElapsed, setTimerElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Start timer
  const startTimer = () => {
    if (!timerActivity) {
      Modal.warning({
        title: 'Activity Required',
        content: 'Please enter an activity name before starting the timer.',
      });
      return;
    }
    
    const now = dayjs();
    setTimerStartTime(now);
    setIsTimerRunning(true);
    
    const interval = setInterval(() => {
      setTimerElapsed(prevElapsed => prevElapsed + 1);
    }, 1000);
    
    setTimerInterval(interval);
  };
  
  // Stop timer and save entry
  const stopTimer = () => {
    clearInterval(timerInterval);
    setIsTimerRunning(false);
    
    const now = dayjs();
    const startTime = timerStartTime.format('HH:mm');
    const endTime = now.format('HH:mm');
    const durationMinutes = now.diff(timerStartTime, 'minute');
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const durationStr = `${hours}h ${minutes}m`;
    
    const newEntry = {
      id: Date.now(),
      activity: timerActivity,
      category: timerCategory,
      date: now.format('YYYY-MM-DD'),
      startTime,
      endTime,
      duration: durationStr,
      notes: '',
    };
    
    setTimeEntries([newEntry, ...timeEntries]);
    setTimerActivity('');
    setTimerCategory('Academic');
    setTimerElapsed(0);
    setTimerStartTime(null);
    
    message.success('Time entry saved successfully!');
  };
  
  // Format timer display
  const formatTimer = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Show modal to add new entry
  const showAddModal = () => {
    setEditingEntry(null);
    form.resetFields();
    form.setFieldsValue({
      date: dayjs(),
      startTime: dayjs().hour(9).minute(0),
      endTime: dayjs().hour(10).minute(0),
      category: 'Academic',
    });
    setIsModalVisible(true);
  };
  
  // Show modal to edit entry
  const showEditModal = (entry) => {
    setEditingEntry(entry);
    form.setFieldsValue({
      activity: entry.activity,
      category: entry.category,
      date: dayjs(entry.date),
      startTime: dayjs(entry.startTime, 'HH:mm'),
      endTime: dayjs(entry.endTime, 'HH:mm'),
      notes: entry.notes,
    });
    setIsModalVisible(true);
  };
  
  // Handle modal OK button
  const handleModalOk = () => {
    form.validateFields().then(values => {
      const { activity, category, date, startTime, endTime, notes } = values;
      
      const formattedStartTime = startTime.format('HH:mm');
      const formattedEndTime = endTime.format('HH:mm');
      
      // Calculate duration
      const startDateTime = dayjs(date).hour(startTime.hour()).minute(startTime.minute());
      const endDateTime = dayjs(date).hour(endTime.hour()).minute(endTime.minute());
      let durationMinutes = endDateTime.diff(startDateTime, 'minute');
      
      // Handle case where end time is on the next day
      if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
      }
      
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      const durationStr = `${hours}h ${minutes}m`;
      
      if (editingEntry) {
        // Update existing entry
        const updatedEntries = timeEntries.map(entry => 
          entry.id === editingEntry.id 
            ? {
                ...entry,
                activity,
                category,
                date: date.format('YYYY-MM-DD'),
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                duration: durationStr,
                notes,
              }
            : entry
        );
        setTimeEntries(updatedEntries);
        message.success('Time entry updated successfully!');
      } else {
        // Add new entry
        const newEntry = {
          id: Date.now(),
          activity,
          category,
          date: date.format('YYYY-MM-DD'),
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          duration: durationStr,
          notes,
        };
        setTimeEntries([newEntry, ...timeEntries]);
        message.success('Time entry added successfully!');
      }
      
      setIsModalVisible(false);
      form.resetFields();
    });
  };
  
  // Delete time entry
  const deleteEntry = (id) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this time entry?',
      onOk: () => {
        const updatedEntries = timeEntries.filter(entry => entry.id !== id);
        setTimeEntries(updatedEntries);
        message.success('Time entry deleted successfully!');
      },
    });
  };
  
  // Filter time entries
  const getFilteredEntries = () => {
    return timeEntries.filter(entry => {
      let matchesDate = true;
      let matchesCategory = true;
      
      if (dateFilter) {
        matchesDate = entry.date >= dateFilter[0].format('YYYY-MM-DD') && 
                      entry.date <= dateFilter[1].format('YYYY-MM-DD');
      }
      
      if (categoryFilter) {
        matchesCategory = entry.category === categoryFilter;
      }
      
      return matchesDate && matchesCategory;
    });
  };
  
  // Calculate total hours
  const calculateTotalHours = (entries) => {
    let totalMinutes = 0;
    
    entries.forEach(entry => {
      const durationParts = entry.duration.split(' ');
      const hours = parseInt(durationParts[0].replace('h', ''), 10) || 0;
      const minutes = parseInt(durationParts[1].replace('m', ''), 10) || 0;
      
      totalMinutes += (hours * 60) + minutes;
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };
  
  // Calculate hours by category
  const calculateHoursByCategory = (entries) => {
    const categoryHours = {};
    
    entries.forEach(entry => {
      const durationParts = entry.duration.split(' ');
      const hours = parseInt(durationParts[0].replace('h', ''), 10) || 0;
      const minutes = parseInt(durationParts[1].replace('m', ''), 10) || 0;
      const totalMinutes = (hours * 60) + minutes;
      
      if (!categoryHours[entry.category]) {
        categoryHours[entry.category] = 0;
      }
      
      categoryHours[entry.category] += totalMinutes;
    });
    
    return Object.keys(categoryHours).map(category => {
      const totalMinutes = categoryHours[category];
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      
      return {
        category,
        duration: `${hours}h ${minutes}m`,
        minutes: totalMinutes,
      };
    }).sort((a, b) => b.minutes - a.minutes);
  };
  
  // Table columns
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => (
        <Tag color={
          category === 'Academic' ? 'blue' :
          category === 'Reading' ? 'green' :
          category === 'Research' ? 'purple' :
          category === 'Project' ? 'magenta' :
          category === 'Exercise' ? 'cyan' :
          category === 'Work' ? 'orange' :
          'default'
        }>
          {category}
        </Tag>
      ),
      filters: categories.map(category => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => {
        const getMinutes = (duration) => {
          const parts = duration.split(' ');
          const hours = parseInt(parts[0].replace('h', ''), 10) || 0;
          const minutes = parseInt(parts[1].replace('m', ''), 10) || 0;
          return (hours * 60) + minutes;
        };
        
        return getMinutes(a.duration) - getMinutes(b.duration);
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button 
              icon={<EditOutlined />} 
              size="small" 
              onClick={() => showEditModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
              onClick={() => deleteEntry(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // Calendar cell renderer
  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const entriesForDate = timeEntries.filter(entry => entry.date === dateStr);
    
    if (entriesForDate.length === 0) {
      return null;
    }
    
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {entriesForDate.slice(0, 2).map((entry, index) => (
          <li key={index}>
            <Badge 
              status="processing" 
              text={<Text ellipsis style={{ fontSize: '12px' }}>{entry.activity} ({entry.duration})</Text>} 
            />
          </li>
        ))}
        {entriesForDate.length > 2 && (
          <li>
            <Text type="secondary" style={{ fontSize: '12px' }}>+{entriesForDate.length - 2} more</Text>
          </li>
        )}
      </ul>
    );
  };
  
  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Time Tracker</Title>
            <Text>Track and manage your study and activity time.</Text>
          </Card>
        </Col>
        
        {/* Timer Section */}
        <Col xs={24} lg={12}>
          <Card title="Timer" extra={<ClockCircleOutlined />}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Title level={1} style={{ fontFamily: 'monospace' }}>
                {formatTimer(timerElapsed)}
              </Title>
              
              {isTimerRunning ? (
                <Paragraph type="secondary">
                  Started at {timerStartTime.format('HH:mm')} · {timerCategory}
                </Paragraph>
              ) : (
                <Paragraph type="secondary">
                  Timer ready
                </Paragraph>
              )}
            </div>
            
            <Row gutter={16}>
              <Col span={isTimerRunning ? 24 : 16}>
                <Input 
                  placeholder="What are you working on?" 
                  value={timerActivity}
                  onChange={e => setTimerActivity(e.target.value)}
                  disabled={isTimerRunning}
                  size="large"
                  prefix={<FieldTimeOutlined />}
                />
              </Col>
              
              {!isTimerRunning && (
                <Col span={8}>
                  <Select
                    value={timerCategory}
                    onChange={value => setTimerCategory(value)}
                    style={{ width: '100%' }}
                    size="large"
                  >
                    {categories.map(category => (
                      <Option key={category} value={category}>{category}</Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row>
            
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              {isTimerRunning ? (
                <Button 
                  type="primary" 
                  danger
                  icon={<PauseCircleOutlined />} 
                  size="large"
                  onClick={stopTimer}
                  style={{ width: 200 }}
                >
                  Stop Timer
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />} 
                  size="large"
                  onClick={startTimer}
                  style={{ width: 200 }}
                >
                  Start Timer
                </Button>
              )}
            </div>
            
            <Divider />
            
            <Row gutter={16}>
              <Col span={12}>
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={showAddModal}
                  block
                >
                  Add Time Manually
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  icon={<HistoryOutlined />}
                  block
                >
                  View Recent Entries
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Stats Section */}
        <Col xs={24} lg={12}>
          <Card title="Time Statistics" extra={<BarChartOutlined />}>
            <Row gutter={[16, 16]}>
              <Col xs={12}>
                <Statistic 
                  title="Today" 
                  value={calculateTotalHours(timeEntries.filter(entry => 
                    entry.date === dayjs().format('YYYY-MM-DD')
                  ))} 
                  prefix={<ClockCircleOutlined />} 
                />
              </Col>
              <Col xs={12}>
                <Statistic 
                  title="This Week" 
                  value={calculateTotalHours(timeEntries.filter(entry => {
                    const entryDate = dayjs(entry.date);
                    const startOfWeek = dayjs().startOf('week');
                    const endOfWeek = dayjs().endOf('week');
                    return entryDate.isAfter(startOfWeek) && entryDate.isBefore(endOfWeek);
                  }))} 
                  prefix={<ClockCircleOutlined />} 
                />
              </Col>
              <Col span={24}>
                <Divider style={{ margin: '12px 0' }} />
                <Title level={5}>Time by Category</Title>
                <List
                  size="small"
                  dataSource={calculateHoursByCategory(timeEntries.filter(entry => {
                    const entryDate = dayjs(entry.date);
                    const startOfWeek = dayjs().startOf('week');
                    const endOfWeek = dayjs().endOf('week');
                    return entryDate.isAfter(startOfWeek) && entryDate.isBefore(endOfWeek);
                  }))}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <Tag color={
                            item.category === 'Academic' ? 'blue' :
                            item.category === 'Reading' ? 'green' :
                            item.category === 'Research' ? 'purple' :
                            item.category === 'Project' ? 'magenta' :
                            item.category === 'Exercise' ? 'cyan' :
                            item.category === 'Work' ? 'orange' :
                            'default'
                          }>
                            {item.category}
                          </Tag>
                        </div>
                        <div style={{ width: '80px', textAlign: 'right' }}>
                          <Text strong>{item.duration}</Text>
                        </div>
                        <div style={{ width: '100px', paddingLeft: '16px' }}>
                          <Progress 
                            percent={Math.round((item.minutes / (40 * 60)) * 100)} 
                            size="small" 
                            showInfo={false}
                            strokeColor={
                              item.category === 'Academic' ? '#1890ff' :
                              item.category === 'Reading' ? '#52c41a' :
                              item.category === 'Research' ? '#722ed1' :
                              item.category === 'Project' ? '#eb2f96' :
                              item.category === 'Exercise' ? '#13c2c2' :
                              item.category === 'Work' ? '#fa8c16' :
                              '#d9d9d9'
                            }
                          />
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Time Entries Tab Section */}
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="list">
              <TabPane 
                tab={<span><HistoryOutlined /> Time Entries</span>}
                key="list"
              >
                <div style={{ marginBottom: 16 }}>
                  <Row gutter={16}>
                    <Col xs={24} md={12} lg={8}>
                      <RangePicker 
                        style={{ width: '100%' }}
                        onChange={setDateFilter}
                        allowClear
                      />
                    </Col>
                    <Col xs={24} md={8} lg={4}>
                      <Select
                        placeholder="Filter by Category"
                        style={{ width: '100%' }}
                        onChange={setCategoryFilter}
                        allowClear
                      >
                        {categories.map(category => (
                          <Option key={category} value={category}>{category}</Option>
                        ))}
                      </Select>
                    </Col>
                    <Col xs={24} md={4} lg={3}>
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                      >
                        Add Entry
                      </Button>
                    </Col>
                  </Row>
                </div>
                
                <Table 
                  columns={columns} 
                  dataSource={getFilteredEntries()} 
                  rowKey="id"
                  pagination={{ pageSize: 10 }}
                  footer={() => (
                    <div style={{ textAlign: 'right' }}>
                      <Text strong>
                        Total: {calculateTotalHours(getFilteredEntries())}
                      </Text>
                    </div>
                  )}
                />
              </TabPane>
              
              <TabPane 
                tab={<span><PieChartOutlined /> Analytics</span>}
                key="analytics"
              >
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Title level={4}>Time Analytics Coming Soon</Title>
                  <Paragraph>
                    Detailed charts and analytics will be available in a future update.
                  </Paragraph>
                </div>
              </TabPane>
              
              <TabPane 
                tab={<span><CalendarOutlined /> Calendar View</span>}
                key="calendar"
              >
                <Calendar 
                  dateCellRender={dateCellRender}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      
      {/* Add/Edit Time Entry Modal */}
      <Modal
        title={editingEntry ? "Edit Time Entry" : "Add Time Entry"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            icon={<SaveOutlined />}
            onClick={handleModalOk}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="activity"
            label="Activity"
            rules={[{ required: true, message: 'Please enter an activity name' }]}
          >
            <Input placeholder="What did you work on?" />
          </Form.Item>
          
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startTime"
                label="Start Time"
                rules={[{ required: true, message: 'Please select a start time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[{ required: true, message: 'Please select an end time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} placeholder="Add any additional notes here" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TimeTracker;
