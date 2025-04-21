import React from 'react';
import { List, Card, Checkbox, Typography, Tag, Space, Progress, Button, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTask } from '../../context/TaskContext';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

// Données pour les priorités
const priorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];

const TaskGrid = ({ onEdit, filteredTasks }) => {
  const { toggleTaskCompletion, deleteTask } = useTask();
  
  // Obtenir la couleur de la priorité
  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.color : 'default';
  };
  
  // Obtenir le libellé de la priorité
  const getPriorityLabel = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.label : 'Unknown';
  };
  
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
      dataSource={filteredTasks}
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
                    <Menu.Item key="edit" onClick={() => onEdit(task)}>
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
  );
};

export default TaskGrid;