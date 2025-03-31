import React, { useState } from 'react';
import { 
  Calendar as AntCalendar, 
  Card, 
  Badge, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  TimePicker, 
  Select, 
  Button, 
  Typography,
  Row,
  Col,
  List,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Static data for simulation
const initialEvents = [
  {
    id: 1,
    title: 'Math Class',
    type: 'class',
    date: '2023-11-24',
    startTime: '10:00',
    endTime: '11:30',
    location: 'Room 101',
    description: 'Algebra lecture'
  },
  {
    id: 2,
    title: 'Study Group',
    type: 'study',
    date: '2023-11-24',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Library',
    description: 'Physics group study session'
  },
  {
    id: 3,
    title: 'Time Management Workshop',
    type: 'workshop',
    date: '2023-11-27',
    startTime: '14:00',
    endTime: '15:30',
    location: 'Student Center',
    description: 'Learn effective time management techniques'
  },
  {
    id: 4,
    title: 'Project Deadline',
    type: 'deadline',
    date: '2023-11-30',
    startTime: '23:59',
    endTime: '23:59',
    location: 'Online Submission',
    description: 'Final project submission deadline'
  },
  {
    id: 5,
    title: 'Advisor Meeting',
    type: 'meeting',
    date: '2023-11-28',
    startTime: '13:00',
    endTime: '13:30',
    location: 'Advisor Office',
    description: 'Discuss academic progress'
  }
];

const eventTypes = [
  { value: 'class', label: 'Class', color: 'blue' },
  { value: 'study', label: 'Study Session', color: 'green' },
  { value: 'workshop', label: 'Workshop', color: 'purple' },
  { value: 'deadline', label: 'Deadline', color: 'red' },
  { value: 'meeting', label: 'Meeting', color: 'orange' },
  { value: 'personal', label: 'Personal', color: 'cyan' }
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState('month');

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    return events.filter(event => event.date === dateString);
  };

  // Show modal for adding/editing event
  const showModal = (event = null, date = null) => {
    setEditingEvent(event);
    
    if (event) {
      form.setFieldsValue({
        title: event.title,
        type: event.type,
        date: dayjs(event.date),
        timeRange: [
          dayjs(`${event.date} ${event.startTime}`),
          dayjs(`${event.date} ${event.endTime}`)
        ],
        location: event.location,
        description: event.description
      });
    } else {
      form.resetFields();
      if (date) {
        form.setFieldsValue({
          date: date
        });
      }
    }
    
    setIsModalVisible(true);
  };

  // Handle modal submission
  const handleModalOk = () => {
    form.validateFields().then(values => {
      const formattedEvent = {
        id: editingEvent ? editingEvent.id : events.length + 1,
        title: values.title,
        type: values.type,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.timeRange[0].format('HH:mm'),
        endTime: values.timeRange[1].format('HH:mm'),
        location: values.location || '',
        description: values.description || ''
      };
      
      if (editingEvent) {
        // Update existing event
        setEvents(events.map(event => 
          event.id === editingEvent.id ? formattedEvent : event
        ));
      } else {
        // Add new event
        setEvents([...events, formattedEvent]);
      }
      
      setIsModalVisible(false);
    });
  };

  // Delete event
  const deleteEvent = (id) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this event?',
      onOk: () => {
        setEvents(events.filter(event => event.id !== id));
      }
    });
  };

  // Calendar cell renderer
  const dateCellRender = (date) => {
    const dateEvents = getEventsForDate(date);
    
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {dateEvents.map(event => (
          <li key={event.id} style={{ marginBottom: 3 }}>
            <Badge 
              color={eventTypes.find(type => type.value === event.type)?.color || 'blue'} 
              text={
                <Text 
                  ellipsis 
                  style={{ fontSize: '12px' }}
                  onClick={() => showModal(event)}
                >
                  {event.startTime} {event.title}
                </Text>
              } 
            />
          </li>
        ))}
      </ul>
    );
  };

  // Handle date selection
  const onSelect = (date) => {
    setSelectedDate(date);
  };

  // Get event type color
  const getEventTypeColor = (type) => {
    return eventTypes.find(t => t.value === type)?.color || 'blue';
  };

  // Get event type label
  const getEventTypeLabel = (type) => {
    return eventTypes.find(t => t.value === type)?.label || type;
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Calendar</Title>
            <Text>Manage your schedule and keep track of important dates.</Text>
          </Card>
        </Col>
        
        <Col xs={24} md={16}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Calendar</span>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal(null, selectedDate)}
                >
                  Add Event
                </Button>
              </div>
            }
          >
            <AntCalendar 
              dateCellRender={dateCellRender}
              onSelect={onSelect}
              value={selectedDate}
              mode={viewMode}
              onPanelChange={(date, mode) => {
                setSelectedDate(date);
                setViewMode(mode);
              }}
            />
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card
            title={`Events on ${selectedDate.format('MMMM D, YYYY')}`}
            extra={
              <Button 
                type="primary" 
                size="small" 
                icon={<PlusOutlined />} 
                onClick={() => showModal(null, selectedDate)}
              >
                Add
              </Button>
            }
          >
            <List
              dataSource={getEventsForDate(selectedDate)}
              renderItem={event => (
                <List.Item
                  actions={[
                    <Button 
                      icon={<EditOutlined />} 
                      size="small" 
                      onClick={() => showModal(event)}
                    />,
                    <Button 
                      icon={<DeleteOutlined />} 
                      size="small" 
                      danger 
                      onClick={() => deleteEvent(event.id)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div>
                        <Text strong>{event.title}</Text>
                        <Tag color={getEventTypeColor(event.type)} style={{ marginLeft: 8 }}>
                          {getEventTypeLabel(event.type)}
                        </Tag>
                      </div>
                    }
                    description={
                      <>
                        <div>
                          <ClockCircleOutlined /> {event.startTime} - {event.endTime}
                        </div>
                        {event.location && (
                          <div>
                            <CalendarOutlined /> {event.location}
                          </div>
                        )}
                        {event.description && (
                          <div style={{ marginTop: 8 }}>
                            {event.description}
                          </div>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
              locale={{ emptyText: 'No events for this date' }}
            />
          </Card>
          
          <Card title="Event Types" style={{ marginTop: 16 }}>
            <List
              size="small"
              dataSource={eventTypes}
              renderItem={type => (
                <List.Item>
                  <Badge color={type.color} text={type.label} />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Add/Edit Event Modal */}
      <Modal
        title={editingEvent ? "Edit Event" : "Add New Event"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please enter event title' }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="Event Type"
            rules={[{ required: true, message: 'Please select event type' }]}
          >
            <Select placeholder="Select event type">
              {eventTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  <Badge color={type.color} text={type.label} />
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="timeRange"
            label="Time"
            rules={[{ required: true, message: 'Please select time range' }]}
          >
            <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="location"
            label="Location"
          >
            <Input placeholder="Enter location" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={3} placeholder="Add details about this event" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Calendar;
