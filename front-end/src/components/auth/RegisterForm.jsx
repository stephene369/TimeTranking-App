import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Typography, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;
const { Option } = Select;

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
        console.log(values)
      await register(values);
      setSuccess('Registration successful! Please check your email to activate your account.');
      form.resetFields();
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="register-card" style={{ maxWidth: 500, margin: '0 auto', marginTop: 50 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
        Create Account
      </Title>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
      {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 20 }} />}
      
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please enter your username' },
            { min: 3, message: 'Username must be at least 3 characters long' },
            { 
              pattern: /^[a-zA-Z0-9_]+$/, 
              message: 'Username can only contain letters, numbers and underscores' 
            }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Username" 
            size="large" 
          />
        </Form.Item>
        
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input 
            prefix={<MailOutlined />} 
            placeholder="Email" 
            size="large" 
          />
        </Form.Item>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="first_name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="First Name" 
              size="large" 
            />
          </Form.Item>
          
          <Form.Item
            name="last_name"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input 
              prefix={<IdcardOutlined />} 
              placeholder="Last Name" 
              size="large" 
            />
          </Form.Item>
        </div>
        
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select your role' }]}
        >
          <Select placeholder="Select your role" size="large">
            <Option value="student">Student</Option>
            <Option value="advisor">Advisor</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters long' }
          ]}
          hasFeedback
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Password" 
            size="large" 
          />
        </Form.Item>
        
        <Form.Item
          name="confirm_password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm Password" 
            size="large" 
          />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block 
            size="large"
          >
            Register
          </Button>
        </Form.Item>
        
        <Divider />
        
        <div style={{ textAlign: 'center' }}>
          <Text>Already have an account? </Text>
          <Link to="/login">Login</Link>
        </div>
      </Form>
    </Card>
  );
};

export default RegisterForm;