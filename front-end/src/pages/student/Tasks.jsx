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
  Statistic,
  message,
  Spin
} from 'antd';

import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  FilterOutlined, // Ajoutez cette ligne
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

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs; // Ajoutez cette ligne
const { TextArea } = Input;
import dayjs from 'dayjs';

import taskService from '../../services/taskService';


const priorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];
const Tasks = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



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
    dataIndex: 'due_date',
    key: 'due_date',
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
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return dayjs(a.due_date).unix() - dayjs(b.due_date).unix();
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
    render: (category, record) => <Tag>{record.category_name || category}</Tag>,
    filters: categories.map(category => ({ text: category, value: category })),
    onFilter: (value, record) => (record.category_name || record.category) === value,
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

  
  // Charger les tâches et les catégories au chargement du composant
  useEffect(() => {
// Dans Tasks.jsx, modifiez la fonction fetchData dans useEffect
const fetchData = async () => {
  try {
    setLoading(true);
    
    // Construire les filtres
    const filters = {};
    if (filterStatus !== 'all') filters.status = filterStatus;
    if (filterCategory) filters.category = filterCategory;
    if (filterPriority) filters.priority = filterPriority;
    
    // Charger les catégories d'abord
    let categoriesData = [];
    try {
      categoriesData = await taskService.getCategories();
    } catch (err) {
      console.warn('Could not load categories, using defaults:', err);
      categoriesData = categories.map(cat => ({ id: cat, name: cat }));
    }
    
    setCategories(categoriesData.map(cat => cat.name || cat));
    
    // Ensuite essayer de charger les tâches
    try {
      const tasksData = await taskService.getTasks(filters);
      // Vérifier que tasksData est un tableau
      setTasks(Array.isArray(tasksData) ? tasksData : []);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Failed to load tasks. Please try again later.');
      setTasks([]); // Réinitialiser à un tableau vide en cas d'erreur
    }
    
    setLoading(false);
  } catch (err) {
    console.error('Error in data loading process:', err);
    setError('An error occurred while loading data.');
    setLoading(false);
  }
};

    
    fetchData();
  }, [filterStatus, filterCategory, filterPriority]);
  
  // Afficher le modal pour ajouter une tâche
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
  
  // Afficher le modal pour éditer une tâche
  const showEditModal = async (task) => {
    setEditingTask(task);
    
    try {
      // Charger les détails complets de la tâche si nécessaire
      const taskDetails = await taskService.getTask(task.id);
      
      form.setFieldsValue({
        title: taskDetails.title,
        description: taskDetails.description,
        dueDate: taskDetails.due_date ? dayjs(taskDetails.due_date) : null,
        priority: taskDetails.priority,
        category: taskDetails.category_name,
        reminder: taskDetails.reminder ? dayjs(taskDetails.reminder) : null,
        tags: taskDetails.tags ? taskDetails.tags : '',
      });
      
      setSubtasks(taskDetails.subtasks || []);
      setIsModalVisible(true);
    } catch (err) {
      console.error('Error loading task details:', err);
      message.error('Failed to load task details');
    }
  };
  
  // Gérer le bouton OK du modal
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values)
      const { title, description, dueDate, priority, category, reminder, tags } = values;
      
      // Formater les tags
      const formattedTags = tags ? tags.split(',').map(tag => tag.trim()).join(',') : '';
      
      const taskData = {
        title,
        description,
        due_date: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        priority,
        category: category, // Vous devrez peut-être ajuster cela pour envoyer l'ID de la catégorie
        reminder: reminder ? reminder.format('YYYY-MM-DD HH:mm') : null,
        tags: formattedTags,
      };
      
      if (editingTask) {
        // Mettre à jour une tâche existante
        await taskService.updateTask(editingTask.id, taskData);
        
        // Mettre à jour les sous-tâches
        // Note: Cela pourrait nécessiter une logique plus complexe pour gérer les ajouts/suppressions
        for (const subtask of subtasks) {
          if (subtask.id && subtask.id > 0) {
            // Mettre à jour une sous-tâche existante
            await taskService.updateSubtask(subtask.id, {
              title: subtask.title,
              completed: subtask.completed
            });
          } else {
            // Créer une nouvelle sous-tâche
            await taskService.createSubtask(editingTask.id, {
              title: subtask.title,
              completed: subtask.completed
            });
          }
        }
        
        message.success('Task updated successfully!');
      } else {
        // Créer une nouvelle tâche
        const newTask = await taskService.createTask(taskData);
        
        // Ajouter les sous-tâches
        for (const subtask of subtasks) {
          await taskService.createSubtask(newTask.id, {
            title: subtask.title,
            completed: subtask.completed
          });
        }
        
        message.success('Task added successfully!');
      }
      
      // Recharger les tâches
      const updatedTasks = await taskService.getTasks({
        status: filterStatus !== 'all' ? filterStatus : null,
        category: filterCategory,
        priority: filterPriority
      });
      setTasks(updatedTasks);
      
      setIsModalVisible(false);
      form.resetFields();
      setSubtasks([]);
    } catch (err) {
      console.error('Error saving task:', err);
      message.error('Failed to save task');
    }
  };
  
  // Supprimer une tâche
  const deleteTask = (id) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this task?',
      onOk: async () => {
        try {
          await taskService.deleteTask(id);
          
          // Mettre à jour la liste des tâches
          setTasks(tasks.filter(task => task.id !== id));
          message.success('Task deleted successfully!');
        } catch (err) {
          console.error('Error deleting task:', err);
          message.error('Failed to delete task');
        }
      },
    });
  };
  
  // Basculer l'état de complétion d'une tâche
  const toggleTaskCompletion = async (id) => {
    try {
      await taskService.toggleTaskCompletion(id);
      
      // Mettre à jour l'état local
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      console.error('Error toggling task completion:', err);
      message.error('Failed to update task status');
    }
  };
  
  // Ajouter une sous-tâche
  const addSubtask = () => {
    const newSubtask = {
      id: -Date.now(), // ID temporaire négatif pour les nouvelles sous-tâches
      title: '',
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  };
  
  // Mettre à jour une sous-tâche
  const updateSubtask = (id, title) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, title } : subtask
    ));
  };
  
  // Basculer l'état de complétion d'une sous-tâche
  const toggleSubtaskCompletion = (id) => {
    setSubtasks(subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    ));
  };
  
  // Supprimer une sous-tâche
  const deleteSubtask = async (id) => {
    // Si c'est une sous-tâche existante (ID positif), la supprimer du serveur
    if (id > 0 && editingTask) {
      try {
        await taskService.deleteSubtask(id);
      } catch (err) {
        console.error('Error deleting subtask:', err);
        message.error('Failed to delete subtask');
        return;
      }
    }
    
    // Mettre à jour l'état local
    setSubtasks(subtasks.filter(subtask => subtask.id !== id));
  };
  
  // Calculer les statistiques des tâches
// Dans la fonction calculateTaskStats
const calculateTaskStats = () => {
  // Vérifier que tasks est un tableau
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  
  const total = tasksArray.length;
  const completed = tasksArray.filter(task => task.completed).length;
  const active = total - completed;
  const dueToday = tasksArray.filter(task => 
    !task.completed && task.due_date === dayjs().format('YYYY-MM-DD')
  ).length;
  const overdue = tasksArray.filter(task => 
    !task.completed && task.due_date && dayjs(task.due_date).isBefore(dayjs(), 'day')
  ).length;
  
  return { total, completed, active, dueToday, overdue };
};

  
  // Calculer le pourcentage de complétion
  const calculateCompletionPercentage = () => {
    const { total, completed } = calculateTaskStats();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };
  
  // Obtenir la couleur de priorité
  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'default';
  };
  
  // Obtenir le libellé de priorité
  const getPriorityLabel = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.label : 'Unknown';
  };

  // Rendu du composant
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading tasks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography.Title level={3} type="danger">Error</Typography.Title>
        <Typography.Paragraph>{error}</Typography.Paragraph>
        <Button type="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Le reste du JSX reste largement inchangé, mais utilisez les données dynamiques */}
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
        {/* ... Le reste du code reste similaire ... */}
        
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
                    dataSource={tasks} 
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                  />
                ) : (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
                    dataSource={tasks}
                    loading={loading}
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
                              <Tag>{task.category_name || task.category}</Tag>
                            </Space>
                          </div>
                          
                          {task.due_date && (
                            <div style={{ marginBottom: 12 }}>
                              <Text 
                                type={
                                  dayjs(task.due_date).isBefore(dayjs(), 'day') ? 'danger' : 
                                  task.due_date === dayjs().format('YYYY-MM-DD') ? 'warning' : 
                                  'secondary'
                                }
                              >
                                <CalendarOutlined style={{ marginRight: 4 }} />
                                {task.due_date === dayjs().format('YYYY-MM-DD') ? 
                                  'Today' : 
                                  dayjs(task.due_date).format('MMM D, YYYY')}
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
                  dateCellRender={(value) => {
                    const dateStr = value.format('YYYY-MM-DD');
                    const tasksForDate = tasks.filter(task => task.due_date === dateStr);
                    
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
                  }}
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
