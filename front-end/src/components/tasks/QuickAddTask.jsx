import React, { useState } from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTask } from '../../context/TaskContext';
import dayjs from 'dayjs';

const { Option } = Select;

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

const QuickAddTask = () => {
  const [form] = Form.useForm();
  const { addTask } = useTask();
  
  const handleQuickAdd = () => {
    form.validateFields().then(values => {
      const { title, dueDate, priority } = values;
      
      if (!title) return;
      
      const newTask = {
        title,
        description: '',
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        priority: priority || 'medium',
        category: 'Other',
        reminder: null,
        tags: [],
        subtasks: [],
      };
      
      addTask(newTask);
      form.resetFields();
    });
  };
  
  return (
    <Card title="Quick Add Task">
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="title"
              rules={[{ required: true, message: 'Please enter a task title' }]}
            >
              <Input placeholder="Task title" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item name="dueDate">
                  <DatePicker placeholder="Due date" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="priority" initialValue="medium">
                  <Select placeholder="Priority" style={{ width: '100%' }}>
                    {priorities.map(priority => (
                      <Option key={priority.value} value={priority.value}>
                        {priority.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleQuickAdd}
            >
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default QuickAddTask;