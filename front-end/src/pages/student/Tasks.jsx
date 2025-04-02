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
  Tabs,
  Modal,
  Tooltip,
  Checkbox,
  Progress,
  List,
  Divider,
  Badge,
  Calendar,
  Dropdown,
  Menu,
  Statistic ,
  
} from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  MoreOutlined,
  SaveOutlined,
  BellOutlined,
  FlagOutlined,
  TagOutlined,
  DownOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: 'Complete Math Assignment',
    description: 'Solve problems 1-20 from Chapter 5',
    dueDate: '2023-11-25',
    priority: 'high',
    category: 'Homework',
    completed: false,
    reminder: '2023-11-24 18:00',
    tags: ['math', 'calculus'],
    subtasks: [
      { id: 101, title: 'Problems 1-10', completed: true },
      { id: 102, title: 'Problems 11-20', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Read History Textbook',
    description: 'Read chapters 7-8 and take notes',
    dueDate: '2023-11-26',
    priority: 'medium',
    category: 'Reading',
    completed: false,
    reminder: null,
    tags: ['history', 'notes'],
    subtasks: []
  },
  {
    id: 3,
    title: 'Research for Science Project',
    description: 'Find sources for renewable energy project',
    dueDate: '2023-12-05',
    priority: 'high',
    category: 'Project',
    completed: false,
    reminder: '2023-12-03 10:00',
    tags: ['science', 'research'],
    subtasks: [
      { id: 103, title: 'Find 5 academic sources', completed: false },
      { id: 104, title: 'Create outline', completed: false },
    ]
  },
  {
    id: 4,
    title: 'Study for English Quiz',
    description: 'Review vocabulary and grammar rules',
    dueDate: '2023-11-24',
    priority: 'medium',
    category: 'Study',
    completed: true,
    reminder: null,
    tags: ['english', 'quiz'],
    subtasks: []
  },
  {
    id: 5,
    title: 'Complete Programming Assignment',
    description: 'Implement sorting algorithm and submit code',
    dueDate: '2023-11-28',
    priority: 'high',
    category: 'Homework',
    completed: false,
    reminder: '2023-11-27 20:00',
    tags: ['programming', 'algorithms'],
    subtasks: [
      { id: 105, title: 'Implement algorithm', completed: false },
      { id: 106, title: 'Write documentation', completed: false },
      { id: 107, title: 'Test code', completed: false },
    ]
  },
  {
    id: 6,
    title: 'Prepare Presentation Slides',
    description: 'Create slides for group presentation',
    dueDate: '2023-12-10',
    priority: 'medium',
    category: 'Project',
    completed: false,
    reminder: '2023-12-08 15:00',
    tags: ['presentation', 'group'],
    subtasks: []
  },
];

// Task categories
const categories = [
  'Homework',
  'Reading',
  'Study',
  'Project',
  'Exam',
  'Other'
];

// Priority options
const priorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];

const Tasks = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  
  // Show modal to add new task
  const showAddModal = () => {
    setEditingTask(null);
    form.resetFields();
    form.setFieldsValue({
      dueDate: dayjs().add(1, 'day'),
      priority: 'medium',
      category: 'Homework',
    });
    setSubtasks([]);
    setIsModalVisible(true);
  };
  
  // Show modal to edit task
  const showEditModal = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      priority: task.priority,
      category: task.category,
      reminder: task.reminder ? dayjs(task.reminder) : null,
      tags: task.tags ? task.tags.join(', ') : '',
    });
    setSubtasks(task.subtasks || []);
    setIsModalVisible(true);
  };
  
  // Handle modal OK button
  const handleModalOk = () => {
    form.validateFields().then(values => {
      const { title, description, dueDate, priority, category, reminder, tags } = values;
      
      const formattedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];
      
      if (editingTask) {
        // Update existing task
        const updatedTasks = tasks.map(task => 
          task.id === editingTask.id 
            ? {
                ...task,
                title,
                description,
                dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
                priority,
                category,
                reminder: reminder ? reminder.format('YYYY-MM-DD HH:mm') : null,
                tags: formattedTags,
                subtasks,
              }
            : task
        );
        setTasks(updatedTasks);
        message.success('Task updated successfully!');
      } else {
        // Add new task
        const newTask = {
          id: Date.now(),
          title,
          description,
          dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
          priority,
          category,
          completed: false,
          reminder: reminder ? reminder.format('YYYY-MM-DD HH:mm') : null,
          tags: formattedTags,
          subtasks,
        };
        setTasks([newTask, ...tasks]);
        message.success('Task added successfully!');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setSubtasks([]);
    });
  };
  
  // Delete task
  const deleteTask = (id) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this task?',
      onOk: () => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        message.success('Task deleted successfully!');
      },
    });
  };
  
  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  
  // Add subtask
  const addSubtask = () => {
    const newSubtask = {
      id: Date.now(),
      title: '',
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  };
  
  // Update subtask
  const updateSubtask = (id, title) => {
    const updatedSubtasks = subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, title } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  
  // Toggle subtask completion
  const toggleSubtaskCompletion = (id) => {
    const updatedSubtasks = subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  
  // Delete subtask
  const deleteSubtask = (id) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== id);
    setSubtasks(updatedSubtasks);
  };
  
  // Filter tasks
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      let matchesStatus = true;
      let matchesCategory = true;
      let matchesPriority = true;
      
      if (filterStatus === 'completed') {
        matchesStatus = task.completed;
      } else if (filterStatus === 'active') {
        matchesStatus = !task.completed;
      }
      
      if (filterCategory) {
        matchesCategory = task.category === filterCategory;
      }
      
      if (filterPriority) {
        matchesPriority = task.priority === filterPriority;
      }
      
      return matchesStatus && matchesCategory && matchesPriority;
    });
  };
  
  // Calculate task statistics
  const calculateTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const dueToday = tasks.filter(task => 
      !task.completed && task.dueDate === dayjs().format('YYYY-MM-DD')
    ).length;
    const overdue = tasks.filter(task => 
      !task.completed && task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day')
    ).length;
    
    return { total, completed, active, dueToday, overdue };
  };
  
  // Calculate completion percentage
  const calculateCompletionPercentage = () => {
    const { total, completed } = calculateTaskStats();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'default';
  };
  
  // Get priority label
  const getPriorityLabel = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.label : 'Unknown';
  };
  
  // Table columns
  const columns = [
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed, record) => (
        <Checkbox 
          checked={completed} 
          onChange={() => toggleTaskCompletion(record.id)}
        />
      ),
      width: 80,
    },
    {
      title: 'Task',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text 
            style={{ 
              textDecoration: record.completed ? 'line-through' : 'none',
              opacity: record.completed ? 0.5 : 1,
            }}
            strong
          >
            {text}
          </Text>
          {record.description && (
            <div>
              <Text 
                type="secondary" 
                ellipsis={{ rows: 1 }}
                style={{ 
                  opacity: record.completed ? 0.5 : 1,
                }}
              >
                {record.description}
              </Text>
            </div>
          )}
          {record.subtasks && record.subtasks.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <Progress 
                percent={Math.round(
                  (record.subtasks.filter(st => st.completed).length / record.subtasks.length) * 100
                )} 
                size="small" 
                format={() => `${record.subtasks.filter(st => st.completed).length}/${record.subtasks.length}`}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate) => {
        if (!dueDate) return <Text type="secondary">No date</Text>;
        
        const isOverdue = dayjs(dueDate).isBefore(dayjs(), 'day');
        const isToday = dueDate === dayjs().format('YYYY-MM-DD');
        
        return (
          <Text 
            type={isOverdue ? 'danger' : isToday ? 'warning' : 'secondary'}
            strong={isOverdue || isToday}
          >
            {isToday ? 'Today' : dayjs(dueDate).format('MMM D, YYYY')}
          </Text>
        );
      },
      sorter: (a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix();
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: priority => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityLabel(priority)}
        </Tag>
      ),
      filters: priorities.map(priority => ({ text: priority.label, value: priority.value })),
      onFilter: (value, record) => record.priority === value,
      width: 100,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag>{category}</Tag>,
      filters: categories.map(category => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
      width: 120,
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
              onClick={() => deleteTask(record.id)}
            />
          </Tooltip>
        </Space>
      ),
      width: 120,
    },
  ];
  
  // Calendar cell renderer
  const dateCellRender = (value) => {
    const dateStr = value.format('YYYY-MM-DD');
    const tasksForDate = tasks.filter(task => task.dueDate === dateStr);
    
    if (tasksForDate.length === 0) {
      return null;
    }
    
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tasksForDate.slice(0, 2).map((task, index) => (
          <li key={index}>
            <Badge 
              status={task.completed ? 'success' : 'processing'} 
              text={<Text ellipsis style={{ fontSize: '12px' }}>{task.title}</Text>} 
            />
          </li>
        ))}
        {tasksForDate.length > 2 && (
          <li>
            <Text type="secondary" style={{ fontSize: '12px' }}>+{tasksForDate.length - 2} more</Text>
          </li>
        )}
      </ul>
    );
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Task Manager</Title>
            <Text>Organize and track your academic tasks and assignments.</Text>
          </Card>
        </Col>
        
        {/* Task Statistics */}
        <Col xs={24} lg={8} style={{ display: 'flex' }}>
          <Card style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Progress 
                  type="circle" 
                  percent={calculateCompletionPercentage()} 
                  width={120}
                  format={percent => `${percent}%`}
                />
                <div style={{ marginTop: 16 }}>
                  <Title level={5}>Task Completion</Title>
                </div>
              </Col>
              
              <Col xs={12}>
                <Statistic 
                  title="Active Tasks" 
                  value={calculateTaskStats().active} 
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col xs={12}>
                <Statistic 
                  title="Completed" 
                  value={calculateTaskStats().completed} 
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col xs={12}>
                <Statistic 
                  title="Due Today" 
                  value={calculateTaskStats().dueToday} 
                  valueStyle={{ color: '#faad14' }}
                />
              </Col>
              <Col xs={12}>
                <Statistic 
                  title="Overdue" 
                  value={calculateTaskStats().overdue} 
                  valueStyle={{ color: '#f5222d' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Quick Add Task */}
        <Col xs={24} lg={16} style={{ display: 'flex' }}>
          <Card title="Quick Add Task" style={{ width: '100%' }} >
            <Form layout="vertical" >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item>
                    <Input placeholder="Task title" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item>
                        <DatePicker placeholder="Due date" style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Select placeholder="Priority" style={{ width: '100%' }}>
                          {priorities.map(priority => (
                            <Option key={priority.value} value={priority.value}>
                              {priority.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Task
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        
        {/* Task List */}
        <Col span={24}>
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16} align="middle">
                <Col xs={24} md={16}>
                  <Space>
                    <Button 
                      type={filterStatus === 'all' ? 'primary' : 'default'}
                      onClick={() => setFilterStatus('all')}
                    >
                      All
                    </Button>
                    <Button 
                      type={filterStatus === 'active' ? 'primary' : 'default'}
                      onClick={() => setFilterStatus('active')}
                    >
                      Active
                    </Button>
                    <Button 
                      type={filterStatus === 'completed' ? 'primary' : 'default'}
                      onClick={() => setFilterStatus('completed')}
                    >
                      Completed
                    </Button>
                    
                    <Dropdown
                      overlay={
                        <Menu
                          selectedKeys={[filterCategory]}
                          onClick={({ key }) => setFilterCategory(key)}
                        >
                          <Menu.Item key={null}>All Categories</Menu.Item>
                          {categories.map(category => (
                            <Menu.Item key={category}>{category}</Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      <Button icon={<FilterOutlined />}>
                        {filterCategory || 'Category'} <DownOutlined />
                      </Button>
                    </Dropdown>
                    
                    <Dropdown
                      overlay={
                        <Menu
                          selectedKeys={[filterPriority]}
                          onClick={({ key }) => setFilterPriority(key)}
                        >
                          <Menu.Item key={null}>All Priorities</Menu.Item>
                          {priorities.map(priority => (
                            <Menu.Item key={priority.value}>{priority.label}</Menu.Item>
                          ))}
                        </Menu>
                      }
                    >
                      <Button icon={<FilterOutlined />}>
                        {filterPriority ? getPriorityLabel(filterPriority) : 'Priority'} <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Space>
                </Col>
                <Col xs={24} md={8} style={{ textAlign: 'right' }}>
                  <Space>
                    <Button 
                      icon={viewMode === 'list' ? <UnorderedListOutlined /> : <AppstoreOutlined />}
                      onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                    >
                      {viewMode === 'list' ? 'List View' : 'Grid View'}
                    </Button>
                    <Button 
                      type="primary" 
                      icon={<PlusOutlined />}
                      onClick={showAddModal}
                    >
                      Add Task
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>
            
            <Tabs defaultActiveKey="tasks">
              <TabPane 
                tab={<span><UnorderedListOutlined /> Tasks</span>}
                key="tasks"
              >
                {viewMode === 'list' ? (
                  <Table 
                    columns={columns} 
                    dataSource={getFilteredTasks()} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                  />
                ) : (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
                    dataSource={getFilteredTasks()}
                    renderItem={task => (
                      <List.Item>
                        <Card
                          size="small"
                          title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Checkbox 
                                checked={task.completed} 
                                onChange={() => toggleTaskCompletion(task.id)}
                                style={{ marginRight: 8 }}
                              />
                              <Text 
                                style={{ 
                                  textDecoration: task.completed ? 'line-through' : 'none',
                                  opacity: task.completed ? 0.5 : 1,
                                }}
                                ellipsis
                              >
                                {task.title}
                              </Text>
                            </div>
                          }
                          extra={
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Menu.Item key="edit" onClick={() => showEditModal(task)}>
                                    <EditOutlined /> Edit
                                  </Menu.Item>
                                  <Menu.Item key="delete" danger onClick={() => deleteTask(task.id)}>
                                    <DeleteOutlined /> Delete
                                  </Menu.Item>
                                </Menu>
                              }
                            >
                              <Button type="text" icon={<MoreOutlined />} size="small" />
                            </Dropdown>
                          }
                        >
                          {task.description && (
                            <Paragraph 
                              type="secondary" 
                              ellipsis={{ rows: 2 }}
                              style={{ 
                                opacity: task.completed ? 0.5 : 1,
                                marginBottom: 12
                              }}
                            >
                              {task.description}
                            </Paragraph>
                          )}
                          
                          <div style={{ marginBottom: 12 }}>
                            <Space>
                              <Tag color={getPriorityColor(task.priority)}>
                                {getPriorityLabel(task.priority)}
                              </Tag>
                              <Tag>{task.category}</Tag>
                            </Space>
                          </div>
                          
                          {task.dueDate && (
                            <div style={{ marginBottom: 12 }}>
                              <Text 
                                type={
                                  dayjs(task.dueDate).isBefore(dayjs(), 'day') ? 'danger' : 
                                  task.dueDate === dayjs().format('YYYY-MM-DD') ? 'warning' : 
                                  'secondary'
                                }
                              >
                                <CalendarOutlined style={{ marginRight: 4 }} />
                                {task.dueDate === dayjs().format('YYYY-MM-DD') ? 
                                  'Today' : 
                                  dayjs(task.dueDate).format('MMM D, YYYY')}
                              </Text>
                            </div>
                          )}
                          
                          {task.subtasks && task.subtasks.length > 0 && (
                            <div>
                              <Text type="secondary">
                                Subtasks: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                              </Text>
                              <Progress 
                                percent={Math.round(
                                  (task.subtasks.filter(st => st.completed).length / task.subtasks.length) * 100
                                )} 
                                size="small" 
                                showInfo={false}
                              />
                            </div>
                          )}
                        </Card>
                      </List.Item>
                    )}
                  />
                )}
              </TabPane>
              
              <TabPane 
                tab={<span><CalendarOutlined /> Calendar</span>}
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
      
      {/* Add/Edit Task Modal */}
      <Modal
        title={editingTask ? "Edit Task" : "Add Task"}
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
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} md={16}>
              <Form.Item
                name="title"
                label="Task Title"
                rules={[{ required: true, message: 'Please enter a task title' }]}
              >
                <Input placeholder="What needs to be done?" />
              </Form.Item>
              
              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea rows={4} placeholder="Add details about this task" />
              </Form.Item>
              
              <Form.Item
                label="Subtasks"
              >
                <div style={{ marginBottom: 8 }}>
                  {subtasks.map((subtask, index) => (
                    <div key={subtask.id} style={{ display: 'flex', marginBottom: 8 }}>
                      <Checkbox 
                        checked={subtask.completed} 
                        onChange={() => toggleSubtaskCompletion(subtask.id)}
                        style={{ marginRight: 8, marginTop: 5 }}
                      />
                      <Input 
                        placeholder="Subtask" 
                        value={subtask.title}
                        onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <Button 
                        type="text" 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => deleteSubtask(subtask.id)}
                        style={{ marginLeft: 8 }}
                      />
                    </div>
                  ))}
                </div>
                <Button 
                  type="dashed" 
                  onClick={addSubtask} 
                  block
                  icon={<PlusOutlined />}
                >
                  Add Subtask
                </Button>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={8}>
              <Form.Item
                name="dueDate"
                label="Due Date"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true, message: 'Please select a priority' }]}
              >
                <Select>
                  {priorities.map(priority => (
                    <Option key={priority.value} value={priority.value}>
                      {priority.label}
                    </Option>
                  ))}
                </Select>
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
              
              <Form.Item
                name="reminder"
                label="Reminder"
              >
                <DatePicker 
                  showTime 
                  format="YYYY-MM-DD HH:mm" 
                  style={{ width: '100%' }}
                  placeholder="Set a reminder"
                />
              </Form.Item>
              
              <Form.Item
                name="tags"
                label="Tags"
              >
                <Input 
                  placeholder="Separate tags with commas" 
                  prefix={<TagOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
