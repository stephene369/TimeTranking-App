import React from 'react';
import { Card, Typography } from 'antd';
import LoginForm from '../../components/auth/LoginForm';

const { Title } = Typography;

const Login = () => {
  return (
  
      <Card>
        <LoginForm />
      </Card>
  );
};

export default Login;