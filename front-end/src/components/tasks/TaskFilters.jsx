import React from 'react';
import { Space, Button, Dropdown, Menu } from 'antd';
import { FilterOutlined, DownOutlined } from '@ant-design/icons';

// Données pour les priorités
const priorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];

// Données pour les catégories
const categories = [
  'Homework',
  'Reading',
  'Study',
  'Project',
  'Exam',
  'Other'
];

const TaskFilters = ({ 
  filterStatus, 
  setFilterStatus, 
  filterCategory, 
  setFilterCategory, 
  filterPriority, 
  setFilterPriority 
}) => {
  
  // Obtenir le libellé de la priorité
  const getPriorityLabel = (priority) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj ? priorityObj.label : 'Unknown';
  };
  
  return (
    <Space wrap>
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
            onClick={({ key }) => setFilterCategory(key === 'null' ? null : key)}
          >
            <Menu.Item key="null">All Categories</Menu.Item>
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
            onClick={({ key }) => setFilterPriority(key === 'null' ? null : key)}
          >
            <Menu.Item key="null">All Priorities</Menu.Item>
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
  );
};

export default TaskFilters;