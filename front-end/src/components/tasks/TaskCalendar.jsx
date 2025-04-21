import React from 'react';
import { Calendar, Badge, Typography } from 'antd';
import { useTask } from '../../context/TaskContext';

const { Text } = Typography;

const TaskCalendar = () => {
  const { tasks } = useTask();
  
  // Rendu des cellules du calendrier
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
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default TaskCalendar;