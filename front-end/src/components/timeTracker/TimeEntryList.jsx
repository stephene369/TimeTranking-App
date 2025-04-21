import React, { useState } from 'react';
import { Table, Button, Space, Tag, Tooltip, Row, Col, Select, DatePicker, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTimer } from '../../context/TimerContext';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Text } = Typography;

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

const TimeEntryList = ({ onEdit, onAdd }) => {
  const { timeEntries, deleteTimeEntry, calculateTotalHours } = useTimer();
  const [dateFilter, setDateFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Filtrer les entrées de temps
  const getFilteredEntries = () => {
    return timeEntries.filter(entry => {
      let matchesDate = true;
      let matchesCategory = true;
      
      if (dateFilter) {
        matchesDate = entry.date >= dateFilter[0].format('YYYY-MM-DD') && 
                      entry.date <= dateFilter[1].format('YYYY-MM-DD');
      }
      
      if (categoryFilter) {
        matchesCategory = entry.category === categoryFilter;
      }
      
      return matchesDate && matchesCategory;
    });
  };

  // Colonnes du tableau
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => (
        <Tag color={
          category === 'Academic' ? 'blue' :
          category === 'Reading' ? 'green' :
          category === 'Research' ? 'purple' :
          category === 'Project' ? 'magenta' :
          category === 'Exercise' ? 'cyan' :
          category === 'Work' ? 'orange' :
          'default'
        }>
          {category}
        </Tag>
      ),
      filters: categories.map(category => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => {
        const getMinutes = (duration) => {
          const parts = duration.split(' ');
          const hours = parseInt(parts[0].replace('h', ''), 10) || 0;
          const minutes = parseInt(parts[1].replace('m', ''), 10) || 0;
          return (hours * 60) + minutes;
        };
        
        return getMinutes(a.duration) - getMinutes(b.duration);
      },
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
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
              onClick={() => deleteTimeEntry(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredEntries = getFilteredEntries();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col xs={24} md={12} lg={8}>
            <RangePicker 
              style={{ width: '100%' }}
              onChange={setDateFilter}
              allowClear
            />
          </Col>
          <Col xs={24} md={8} lg={4}>
            <Select
              placeholder="Filter by Category"
              style={{ width: '100%' }}
              onChange={setCategoryFilter}
              allowClear
            >
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={4} lg={3}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={onAdd}
            >
              Add Entry
            </Button>
          </Col>
        </Row>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredEntries} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
        footer={() => (
          <div style={{ textAlign: 'right' }}>
            <Text strong>
              Total: {calculateTotalHours(filteredEntries)}
            </Text>
          </div>
        )}
      />
    </div>
  );
};

export default TimeEntryList;
