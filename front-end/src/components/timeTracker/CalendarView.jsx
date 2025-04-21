import React from 'react';
import { Calendar, Badge, Typography } from 'antd';
import { useTimer } from '../../context/TimerContext';
import dayjs from 'dayjs';

const { Text } = Typography;

const CalendarView = () => {
  const { timeEntries } = useTimer();

  // Rendu des cellules du calendrier
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

  return (
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default CalendarView;