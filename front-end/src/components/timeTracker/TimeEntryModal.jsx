import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker, Row, Col, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useTimer } from '../../context/TimerContext';
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

const TimeEntryModal = ({ visible, onCancel, editingEntry }) => {
  const [form] = Form.useForm();
  const { addTimeEntry, updateTimeEntry } = useTimer();

  // Remplir le formulaire lorsqu'on édite une entrée
  useEffect(() => {
    if (visible && editingEntry) {
      form.setFieldsValue({
        activity: editingEntry.activity,
        category: editingEntry.category,
        date: dayjs(editingEntry.date),
        startTime: dayjs(editingEntry.startTime, 'HH:mm'),
        endTime: dayjs(editingEntry.endTime, 'HH:mm'),
        notes: editingEntry.notes,
      });
    } else if (visible) {
      // Valeurs par défaut pour une nouvelle entrée
      form.setFieldsValue({
        date: dayjs(),
        startTime: dayjs().hour(9).minute(0),
        endTime: dayjs().hour(10).minute(0),
        category: 'Academic',
      });
    }
  }, [visible, editingEntry, form]);

  // Gérer la soumission du formulaire
  const handleOk = () => {
    form.validateFields().then(values => {
      const { activity, category, date, startTime, endTime, notes } = values;
      
      const formattedStartTime = startTime.format('HH:mm');
      const formattedEndTime = endTime.format('HH:mm');
      
      // Calculer la durée
      const startDateTime = dayjs(date).hour(startTime.hour()).minute(startTime.minute());
      const endDateTime = dayjs(date).hour(endTime.hour()).minute(endTime.minute());
      let durationMinutes = endDateTime.diff(startDateTime, 'minute');
      
      // Gérer le cas où l'heure de fin est le jour suivant
      if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
      }
      
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      const durationStr = `${hours}h ${minutes}m`;
      
      if (editingEntry) {
        // Mettre à jour une entrée existante
        const updatedEntry = {
          ...editingEntry,
          activity,
          category,
          date: date.format('YYYY-MM-DD'),
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          duration: durationStr,
          notes,
        };
        updateTimeEntry(updatedEntry);
      } else {
        // Ajouter une nouvelle entrée
        const newEntry = {
          id: Date.now(),
          activity,
          category,
          date: date.format('YYYY-MM-DD'),
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          duration: durationStr,
          notes,
        };
        addTimeEntry(newEntry);
      }
      
      onCancel();
      form.resetFields();
    });
  };

  return (
    <Modal
      title={editingEntry ? "Edit Time Entry" : "Add Time Entry"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          icon={<SaveOutlined />}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
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
    </Modal>
  );
};

export default TimeEntryModal;
