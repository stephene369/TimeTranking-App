import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Row, Col, Checkbox } from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTask } from '../../context/TaskContext';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

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

const TaskModal = ({ visible, onCancel, editingTask }) => {
  const [form] = Form.useForm();
  const { addTask, updateTask } = useTask();
  const [subtasks, setSubtasks] = useState([]);
  
  // Initialiser le formulaire lorsque la tâche à éditer change
  useEffect(() => {
    if (visible) {
      if (editingTask) {
        form.setFieldsValue({
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : null,
          priority: editingTask.priority,
          category: editingTask.category,
          reminder: editingTask.reminder ? dayjs(editingTask.reminder) : null,
          tags: editingTask.tags ? editingTask.tags.join(', ') : '',
        });
        setSubtasks(editingTask.subtasks || []);
      } else {
        form.resetFields();
        form.setFieldsValue({
          dueDate: dayjs().add(1, 'day'),
          priority: 'medium',
          category: 'Homework',
        });
        setSubtasks([]);
      }
    }
  }, [visible, editingTask, form]);
  
  // Gérer la soumission du formulaire
  const handleOk = () => {
    form.validateFields().then(values => {
      const { title, description, dueDate, priority, category, reminder, tags } = values;
      
      const formattedTags = tags ? tags.split(',').map(tag => tag.trim()) : [];
      
      const taskData = {
        title,
        description,
        dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
        priority,
        category,
        reminder: reminder ? reminder.format('YYYY-MM-DD HH:mm') : null,
        tags: formattedTags,
        subtasks,
      };
      
      if (editingTask) {
        updateTask({ ...taskData, id: editingTask.id, completed: editingTask.completed });
      } else {
        addTask(taskData);
      }
      
      onCancel();
    });
  };
  
  // Ajouter une sous-tâche
  const addSubtask = () => {
    const newSubtask = {
      id: Date.now(),
      title: '',
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
  };
  
  // Mettre à jour une sous-tâche
  const updateSubtask = (id, title) => {
    const updatedSubtasks = subtasks.map(subtask => 
      subtask.id === id ? { ...subtask, title } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  
  // Basculer l'état d'achèvement d'une sous-tâche
  const toggleSubtaskCompletion = (id) => {
    const updatedSubtasks = subtasks.map(subtask => 
        subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask
    );
    setSubtasks(updatedSubtasks);
  };
  
  // Supprimer une sous-tâche
  const deleteSubtask = (id) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== id);
    setSubtasks(updatedSubtasks);
  };
  
  return (
    <Modal
      title={editingTask ? "Edit Task" : "Add Task"}
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
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col xs={24} md={16}>
            <Form.Item
              name="title"
              label="Task Title"
              rules={[{ required: true, message: 'Please enter a task title' }]}
            >
              <Input placeholder="What needs to be done?" />
            </Form.Item>
            
            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea rows={4} placeholder="Add details about this task" />
            </Form.Item>
            
            <Form.Item
              label="Subtasks"
            >
              <div style={{ marginBottom: 8 }}>
                {subtasks.map((subtask, index) => (
                  <div key={subtask.id} style={{ display: 'flex', marginBottom: 8 }}>
                    <Checkbox 
                      checked={subtask.completed} 
                      onChange={() => toggleSubtaskCompletion(subtask.id)}
                      style={{ marginRight: 8, marginTop: 5 }}
                    />
                    <Input 
                      placeholder="Subtask" 
                      value={subtask.title}
                      onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <Button 
                      type="text" 
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => deleteSubtask(subtask.id)}
                      style={{ marginLeft: 8 }}
                    />
                  </div>
                ))}
              </div>
              <Button 
                type="dashed" 
                onClick={addSubtask} 
                block
                icon={<PlusOutlined />}
              >
                Add Subtask
              </Button>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item
              name="dueDate"
              label="Due Date"
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="priority"
              label="Priority"
              rules={[{ required: true, message: 'Please select a priority' }]}
            >
              <Select>
                {priorities.map(priority => (
                  <Option key={priority.value} value={priority.value}>
                    {priority.label}
                  </Option>
                ))}
              </Select>
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
            
            <Form.Item
              name="reminder"
              label="Reminder"
            >
              <DatePicker 
                showTime 
                format="YYYY-MM-DD HH:mm" 
                style={{ width: '100%' }}
                placeholder="Set a reminder"
              />
            </Form.Item>
            
            <Form.Item
              name="tags"
              label="Tags"
            >
              <Input 
                placeholder="Separate tags with commas" 
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TaskModal;
