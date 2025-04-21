import React from 'react';
import { Card, Input, Select, Button, Typography, Space, Divider,Row,Col } from 'antd';
import { 
  ClockCircleOutlined, 
  PlayCircleOutlined, 
  PauseCircleOutlined, 
  PlusOutlined, 
  FieldTimeOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { useTimer } from '../../context/TimerContext';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Catégories d'activités
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

const Timer = ({ onAddManually }) => {
  const { 
    isTimerRunning, 
    timerActivity, 
    timerCategory, 
    timerStartTime, 
    timerElapsed, 
    setTimerActivity, 
    setTimerCategory, 
    startTimer, 
    stopTimer, 
    formatTimer 
  } = useTimer();
  
  return (
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
      
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input 
          placeholder="What are you working on?" 
          value={timerActivity}
          onChange={e => setTimerActivity(e.target.value)}
          disabled={isTimerRunning}
          size="large"
          prefix={<FieldTimeOutlined />}
        />
        
        {!isTimerRunning && (
          <Select
            placeholder="Select category"
            value={timerCategory}
            onChange={value => setTimerCategory(value)}
            style={{ width: '100%' }}
            size="large"
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        )}
      </Space>
      
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
            onClick={onAddManually}
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
            <Link to="/student/time-tracker">View Recent Entries</Link>
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Timer;
