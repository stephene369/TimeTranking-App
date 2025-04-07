import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../types/user';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get previous location if it exists
  const from = location.state?.from?.pathname || '/';

  const onFinish = (values) => {
    setLoading(true);
    
    // Simulate authentication request
    setTimeout(() => {
      // Example user for demonstration
      const userData = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: values.email,
        role: values.email.includes('advisor') ? USER_ROLES.ADVISOR : USER_ROLES.STUDENT
      };
      
      const success = login(userData);
      
      if (success) {
        message.success('Login successful!');
        
        // Redirect to previous page or appropriate dashboard
        if (from !== '/') {
          navigate(from);
        } else if (userData.role === USER_ROLES.STUDENT) {
          navigate('/student/dashboard');
        } else if (userData.role === USER_ROLES.ADVISOR) {
          navigate('/advisor/dashboard');
        } else {
          navigate('/');
        }
      } else {
        message.error('Login failed. Please check your credentials.');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 64px)',
      padding: '20px'
    }}>
      <Card style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Login</Title>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            
            <a style={{ float: 'right' }} href="/forgot-password">
              Forgot password?
            </a>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <a href="/register">Register now!</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;