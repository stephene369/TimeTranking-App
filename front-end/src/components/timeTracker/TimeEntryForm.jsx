import React from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

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

const TimeEntryForm = ({ form, initialValues = {} }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        date: initialValues.date ? dayjs(initialValues.date) : dayjs(),
        startTime: initialValues.startTime ? dayjs(initialValues.startTime, 'HH:mm') : dayjs().hour(9).minute(0),
        endTime: initialValues.endTime ? dayjs(initialValues.endTime, 'HH:mm') : dayjs().hour(10).minute(0),
        category: initialValues.category || 'Academic',
        activity: initialValues.activity || '',
        notes: initialValues.notes || '',
      }}
    >
      <Form.Item
        name="activity"
        label="Activity"
        rules={[{ required: true, message: 'Please enter an activity name' }]}
      >
        <Input placeholder="What did you work on?" />
      </Form.Item>
      
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select>
          {categories.map(category => (
            <Option key={category} value={category}>{category}</Option>
          ))}
        </Select>
      </Form.Item>
      
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please select a start time' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please select an end time' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item
        name="notes"
        label="Notes"
      >
        <TextArea rows={4} placeholder="Add any additional notes here" />
      </Form.Item>
    </Form>
  );
};

export default TimeEntryForm;