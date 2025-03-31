import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  Switch, 
  Select, 
  Upload, 
  Avatar, 
  Divider,
  TimePicker,
  Space,
  message,
  Radio
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  BellOutlined, 
  ClockCircleOutlined,
  UploadOutlined,
  SaveOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  BookOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [timeForm] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState(null);
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    major: 'Computer Science',
    bio: 'Student passionate about technology and learning new skills.',
    language: 'english',
    timezone: 'America/New_York',
  };
  
  // Mock notification settings
  const notificationSettings = {
    emailNotifications: true,
    taskReminders: true,
    studyReminders: false,
    weeklyReports: true,
    systemUpdates: true,
  };
  
  // Mock time tracking settings
  const timeTrackingSettings = {
    defaultStartTime: dayjs('09:00', 'HH:mm'),
    defaultEndTime: dayjs('17:00', 'HH:mm'),
    trackingMode: 'manual',
    defaultCategory: 'Academic',
    roundingInterval: '15',
  };
  
  // Initialize form values
  React.useEffect(() => {
    profileForm.setFieldsValue(userData);
    notificationForm.setFieldsValue(notificationSettings);
    timeForm.setFieldsValue({
      ...timeTrackingSettings,
      defaultStartTime: timeTrackingSettings.defaultStartTime,
      defaultEndTime: timeTrackingSettings.defaultEndTime,
    });
  }, []);
  
  // Handle profile form submission
  const handleProfileSubmit = (values) => {
    console.log('Profile form values:', values);
    message.success('Profile updated successfully');
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (values) => {
    console.log('Password form values:', values);
    message.success('Password changed successfully');
    passwordForm.resetFields();
  };
  
  // Handle notification settings submission
  const handleNotificationSubmit = (values) => {
    console.log('Notification settings:', values);
    message.success('Notification preferences updated');
  };
  
  // Handle time tracking settings submission
  const handleTimeSettingsSubmit = (values) => {
    console.log('Time tracking settings:', values);
    message.success('Time tracking preferences updated');
  };
  
  // Handle avatar upload
  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world
      getBase64(info.file.originFileObj, url => {
        setAvatarUrl(url);
      });
      message.success('Avatar uploaded successfully');
    }
  };
  
  // Convert file to base64
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Title level={4}>Account Settings</Title>
            <Text>Manage your profile, preferences, and account settings.</Text>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="profile">
              {/* Profile Settings */}
              <TabPane 
                tab={<span><UserOutlined />Profile</span>} 
                key="profile"
              >
                <Row gutter={24}>
                  <Col xs={24} md={8} style={{ textAlign: 'center' }}>
                    <Avatar 
                      size={120} 
                      icon={<UserOutlined />} 
                      src={avatarUrl}
                      style={{ marginBottom: 16 }}
                    />
                    <div>
                      <Upload 
                        onChange={handleAvatarChange}
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      >
                        <Button icon={<UploadOutlined />}>Change Avatar</Button>
                      </Upload>
                    </div>
                    <Divider />
                    <Paragraph>
                      Your profile picture will be displayed on your dashboard and in your activity.
                    </Paragraph>
                  </Col>
                  
                  <Col xs={24} md={16}>
                    <Form
                      form={profileForm}
                      layout="vertical"
                      onFinish={handleProfileSubmit}
                    >
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                          >
                            <Input prefix={<UserOutlined />} placeholder="Your name" />
                          </Form.Item>
                        </Col>
                        
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email' }
                              ]}
                            >
                              <Input prefix={<MailOutlined />} placeholder="Your email" />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="phone"
                              label="Phone Number"
                            >
                              <Input prefix={<PhoneOutlined />} placeholder="Your phone number" />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="major"
                              label="Major/Field of Study"
                            >
                              <Input prefix={<BookOutlined />} placeholder="Your major" />
                            </Form.Item>
                          </Col>
                          
                          <Col xs={24} md={12}>
                            <Form.Item
                              name="language"
                              label="Preferred Language"
                            >
                              <Select>
                                <Option value="english">English</Option>
                                <Option value="spanish">Spanish</Option>
                                <Option value="french">French</Option>
                                <Option value="german">German</Option>
                                <Option value="chinese">Chinese</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          
                          <Col span={24}>
                            <Form.Item
                              name="bio"
                              label="Bio"
                            >
                              <TextArea rows={4} placeholder="Tell us about yourself" />
                            </Form.Item>
                          </Col>
                          
                          <Col span={24}>
                            <Form.Item
                              name="timezone"
                              label="Timezone"
                            >
                              <Select>
                                <Option value="America/New_York">Eastern Time (ET)</Option>
                                <Option value="America/Chicago">Central Time (CT)</Option>
                                <Option value="America/Denver">Mountain Time (MT)</Option>
                                <Option value="America/Los_Angeles">Pacific Time (PT)</Option>
                                <Option value="Europe/London">Greenwich Mean Time (GMT)</Option>
                                <Option value="Europe/Paris">Central European Time (CET)</Option>
                                <Option value="Asia/Tokyo">Japan Standard Time (JST)</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          
                          <Col span={24}>
                            <Form.Item>
                              <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                                Save Profile
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </TabPane>
                
                {/* Password Settings */}
                <TabPane 
                  tab={<span><LockOutlined />Password</span>} 
                  key="password"
                >
                  <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordSubmit}
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="currentPassword"
                          label="Current Password"
                          rules={[{ required: true, message: 'Please enter your current password' }]}
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="Current password" />
                        </Form.Item>
                        
                        <Form.Item
                          name="newPassword"
                          label="New Password"
                          rules={[
                            { required: true, message: 'Please enter your new password' },
                            { min: 8, message: 'Password must be at least 8 characters' }
                          ]}
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="New password" />
                        </Form.Item>
                        
                        <Form.Item
                          name="confirmPassword"
                          label="Confirm New Password"
                          dependencies={['newPassword']}
                          rules={[
                            { required: true, message: 'Please confirm your new password' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match'));
                              },
                            }),
                          ]}
                        >
                          <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" />
                        </Form.Item>
                        
                        <Form.Item>
                          <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                            Change Password
                          </Button>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                        <Card title="Password Requirements" size="small" >
                          <ul>
                            <li>At least 8 characters long</li>
                            <li>Contains at least one uppercase letter</li>
                            <li>Contains at least one lowercase letter</li>
                            <li>Contains at least one number</li>
                            <li>Contains at least one special character</li>
                          </ul>
                        </Card>
                        
                        <Card title="Security Tips" size="small" style={{ marginTop: 16 }}>
                          <ul>
                            <li>Use a unique password for each account</li>
                            <li>Don't share your password with others</li>
                            <li>Change your password regularly</li>
                            <li>Consider using a password manager</li>
                          </ul>
                        </Card>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                
                {/* Notification Settings */}
                <TabPane 
                  tab={<span><BellOutlined />Notifications</span>} 
                  key="notifications"
                >
                  <Form
                    form={notificationForm}
                    layout="vertical"
                    onFinish={handleNotificationSubmit}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="emailNotifications"
                          label="Email Notifications"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                        <Text type="secondary">Receive notifications via email</Text>
                        <Divider />
                        
                        <Form.Item
                          name="taskReminders"
                          label="Task Reminders"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                        <Text type="secondary">Receive reminders for upcoming and overdue tasks</Text>
                        <Divider />
                        
                        <Form.Item
                          name="studyReminders"
                          label="Study Session Reminders"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                        <Text type="secondary">Receive reminders for scheduled study sessions</Text>
                        <Divider />
                        
                        <Form.Item
                          name="weeklyReports"
                          label="Weekly Progress Reports"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                        <Text type="secondary">Receive weekly summary of your study activity</Text>
                        <Divider />
                        
                        <Form.Item
                          name="systemUpdates"
                          label="System Updates"
                          valuePropName="checked"
                        >
                          <Switch />
                        </Form.Item>
                        <Text type="secondary">Receive notifications about system updates and new features</Text>
                        <Divider />
                        
                        <Form.Item>
                          <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                            Save Notification Settings
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                
                {/* Time Tracking Settings */}
                <TabPane 
                  tab={<span><ClockCircleOutlined />Time Tracking</span>} 
                  key="timeTracking"
                >
                  <Form
                    form={timeForm}
                    layout="vertical"
                    onFinish={handleTimeSettingsSubmit}
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="trackingMode"
                          label="Time Tracking Mode"
                        >
                          <Radio.Group>
                            <Space direction="vertical">
                              <Radio value="manual">
                                <Text strong>Manual</Text>
                                <div><Text type="secondary">Manually enter start and end times</Text></div>
                              </Radio>
                              <Radio value="timer">
                                <Text strong>Timer</Text>
                                <div><Text type="secondary">Use a start/stop timer for tracking</Text></div>
                              </Radio>
                              <Radio value="automatic">
                                <Text strong>Automatic</Text>
                                <div><Text type="secondary">Automatically track when app is open</Text></div>
                              </Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                        
                        <Form.Item
                          name="roundingInterval"
                          label="Time Rounding"
                        >
                          <Select>
                            <Option value="1">No rounding</Option>
                            <Option value="5">Round to 5 minutes</Option>
                            <Option value="15">Round to 15 minutes</Option>
                            <Option value="30">Round to 30 minutes</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col xs={24} md={12}>
                        <Form.Item
                          name="defaultStartTime"
                          label="Default Start Time"
                        >
                          <TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        
                        <Form.Item
                          name="defaultEndTime"
                          label="Default End Time"
                        >
                          <TimePicker format="HH:mm" style={{ width: '100%' }} />
                        </Form.Item>
                        
                        <Form.Item
                          name="defaultCategory"
                          label="Default Activity Category"
                        >
                          <Select>
                            <Option value="Academic">Academic</Option>
                            <Option value="Reading">Reading</Option>
                            <Option value="Research">Research</Option>
                            <Option value="Project">Project</Option>
                            <Option value="Exercise">Exercise</Option>
                            <Option value="Work">Work</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      
                      <Col span={24}>
                        <Divider />
                        <Form.Item>
                          <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                            Save Time Tracking Settings
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default Settings;
  