import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space, 
  Tabs,
  Alert
} from 'antd';
import { 
  PlusOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { TaskProvider, useTask } from '../../context/TaskContext';
import TaskStatistics from '../../components/tasks/TaskStatistics';
import QuickAddTask from '../../components/tasks/QuickAddTask';
import TaskFilters from '../../components/tasks/TaskFilters';
import TaskList from '../../components/tasks/TaskList';
import TaskGrid from '../../components/tasks/TaskGrid';
import TaskCalendar from '../../components/tasks/TaskCalendar';
import TaskModal from '../../components/tasks/TaskModal';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Composant interne qui utilise le contexte
const TasksContent = () => {
  const { filterTasks, loading, error } = useTask();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterPriority, setFilterPriority] = useState(null);
  
  // Afficher le modal pour ajouter une tâche
  const showAddModal = () => {
    setEditingTask(null);
    setIsModalVisible(true);
  };
  
  // Afficher le modal pour éditer une tâche
  const showEditModal = (task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };
  
  // Fermer le modal
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };
  
  // Obtenir les tâches filtrées
  const filteredTasks = filterTasks(filterStatus, filterCategory, filterPriority);
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Task Manager</Title>
            <Text>Organize and track your academic tasks and assignments.</Text>
            
            {error && (
              <Alert 
                message="Error" 
                description={error} 
                type="error" 
                showIcon 
                style={{ marginTop: 16 }}
              />
            )}
          </Card>
        </Col>
        
        {/* Task Statistics */}
        <Col xs={24} lg={8} style={{ display: 'flex' }}>
          <TaskStatistics />
        </Col>
        
        {/* Quick Add Task */}
        <Col xs={24} lg={16} style={{ display: 'flex' }}>
          <QuickAddTask />
        </Col>
        
        {/* Task List */}
        <Col span={24}>
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16} align="middle">
                <Col xs={24} md={16}>
                  <TaskFilters 
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    filterPriority={filterPriority}
                    setFilterPriority={setFilterPriority}
                  />
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
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    Loading tasks...
                  </div>
                ) : (
                  viewMode === 'list' ? (
                    <TaskList 
                      onEdit={showEditModal} 
                      filteredTasks={filteredTasks} 
                    />
                  ) : (
                    <TaskGrid 
                      onEdit={showEditModal} 
                      filteredTasks={filteredTasks} 
                    />
                  )
                )}
              </TabPane>
              
              <TabPane 
                tab={<span><CalendarOutlined /> Calendar</span>}
                key="calendar"
              >
                <TaskCalendar />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      
      {/* Add/Edit Task Modal */}
      <TaskModal 
        visible={isModalVisible} 
        onCancel={handleModalCancel} 
        editingTask={editingTask} 
      />
    </div>
  );
};

// Composant principal qui fournit le contexte
const Tasks = () => {
  return (
    <TaskProvider>
      <TasksContent />
    </TaskProvider>
  );
};

export default Tasks;