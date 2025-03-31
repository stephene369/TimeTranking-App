import React from 'react';
import { Form, Input, Button, Card, Typography, Divider, Select, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Simulate registration logic
    console.log('Registration values:', values);
    message.success('Registration successful! Please check your email to verify your account.');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Create an Account</Title>
        
        <Form
          name="register_form"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" />
          </Form.Item>
          
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          
          <Form.Item
            name="userType"
            rules={[{ required: true, message: 'Please select user type!' }]}
          >
            <Select placeholder="Select User Type">
              <Option value="student">Student</Option>
              <Option value="advisor">Advisor</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>
          
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { 
                validator: (_, value) => 
                  value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')),
              },
            ]}
          >
            <Checkbox>
              I have read and agree to the <Link to="/terms">Terms and Conditions</Link>
            </Checkbox>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Register
            </Button>
          </Form.Item>
        </Form>
        
        <Divider />
        
        <div style={{ textAlign: 'center' }}>
          <Text>Already have an account? </Text>
          <Link to="/login">Login now</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
