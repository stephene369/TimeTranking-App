import React from 'react';
import { Card, Typography } from 'antd';
import RegisterForm from '../../components/auth/RegisterForm';

const { Title } = Typography;

const Register = () => {
  return (
      <Card>
        <RegisterForm />
      </Card>
  );
};

export default Register;
