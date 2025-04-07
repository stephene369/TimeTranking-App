import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const LoginForm = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL after login
  const from = location.state?.from?.pathname || '/';
  
  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      const user = await login(values);
      
      // Redirect to appropriate page based on role
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'advisor') {
        navigate('/advisor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="login-card" style={{ maxWidth: 400, margin: '0 auto', marginTop: 50 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
        Login
      </Title>
      
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}
      
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Email" 
            size="large" 
          />
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Password" 
            size="large" 
          />
        </Form.Item>
        
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          
          <Link to="/forgot-password" style={{ float: 'right' }}>
            Forgot password?
          </Link>
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block 
            size="large"
          >
            Login
          </Button>
        </Form.Item>
        
        <div style={{ textAlign: 'center' }}>
          <Text>Don't have an account? </Text>
          <Link to="/register">Register</Link>
        </div>
      </Form>
    </Card>
  );
};

export default LoginForm;