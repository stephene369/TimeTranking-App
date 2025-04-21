import React from 'react';
import { Card, Row, Col, Progress, Typography, Statistic } from 'antd';
import { useTask } from '../../context/TaskContext';

const { Title } = Typography;

const TaskStatistics = () => {
  const { calculateTaskStats, calculateCompletionPercentage } = useTask();
  
  const stats = calculateTaskStats();
  const completionPercentage = calculateCompletionPercentage();
  
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Progress 
            type="circle" 
            percent={completionPercentage} 
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
            value={stats.active} 
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col xs={12}>
          <Statistic 
            title="Completed" 
            value={stats.completed} 
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col xs={12}>
          <Statistic 
            title="Due Today" 
            value={stats.dueToday} 
            valueStyle={{ color: '#faad14' }}
          />
        </Col>
        <Col xs={12}>
          <Statistic 
            title="Overdue" 
            value={stats.overdue} 
            valueStyle={{ color: '#f5222d' }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskStatistics;