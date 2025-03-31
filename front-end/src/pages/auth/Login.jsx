import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Simulate login logic
    console.log('Login values:', values);
    message.success('Login successful!');
    
    // Redirect based on user type (simulated)
    if (values.username === 'student') {
      navigate('/student/dashboard');
    } else if (values.username === 'advisor') {
      navigate('/advisor/dashboard');
    } else if (values.username === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard'); // Default to student
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>Welcome Back</Title>
        
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username (try: student, advisor, admin)" />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password (any value works)" />
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
          
          <Divider plain>Or login with</Divider>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <Button icon={<GoogleOutlined />}>Google</Button>
            <Button icon={<FacebookOutlined />}>Facebook</Button>
          </div>
        </Form>
        
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Text>Don't have an account? </Text>
          <Link to="/register">Register now</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
