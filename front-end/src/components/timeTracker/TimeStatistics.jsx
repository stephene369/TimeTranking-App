import React from 'react';
import { Card, Row, Col, Statistic, Divider,  List, Tag, Typography, Progress } from 'antd';
import { ClockCircleOutlined, BarChartOutlined } from '@ant-design/icons';
import { useTimer } from '../../context/TimerContext';
import dayjs from 'dayjs';

const { Title: AntTitle, Text } = Typography;

const TimeStatistics = () => {
  const { timeEntries, calculateTotalHours, calculateHoursByCategory } = useTimer();

  // Filtrer les entrées pour aujourd'hui
  const todayEntries = timeEntries.filter(entry => 
    entry.date === dayjs().format('YYYY-MM-DD')
  );

  // Filtrer les entrées pour cette semaine
  const weekEntries = timeEntries.filter(entry => {
    const entryDate = dayjs(entry.date);
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');
    return entryDate.isAfter(startOfWeek) && entryDate.isBefore(endOfWeek);
  });

  return (
    <Card title="Time Statistics" extra={<BarChartOutlined />}>
      <Row gutter={[16, 16]}>
        <Col xs={12}>
          <Statistic 
            title="Today" 
            value={calculateTotalHours(todayEntries)} 
            prefix={<ClockCircleOutlined />} 
          />
        </Col>
        <Col xs={12}>
          <Statistic 
            title="This Week" 
            value={calculateTotalHours(weekEntries)} 
            prefix={<ClockCircleOutlined />} 
          />
        </Col>
        <Col span={24}>
          <Divider style={{ margin: '12px 0' }} />
          <AntTitle level={5}>Time by Category</AntTitle>
          <List
            size="small"
            dataSource={calculateHoursByCategory(weekEntries)}
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
  );
};

export default TimeStatistics;
