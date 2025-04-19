// import React from 'react';
// import { Card, Typography } from 'antd';
// import RegisterForm from '../../components/auth/RegisterForm';

// const { Title } = Typography;

// const Register = () => {
//   return (
//       <Card>
//         <RegisterForm />
//       </Card>
//   );
// };

// export default Register;

import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import for redirection

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // ✅ react-router hook

  const handleSubmit = async (formData) => {
    console.log('Form submitted:', formData);
    alert('Form submitted!');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register/`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }
      );

      message.success('✅ User registered successfully!');
      console.log('Registration response:', response.data);
      form.resetFields();

      // ✅ Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('❌ Registration error:', error);
      if (error.response?.data?.detail) {
        message.error(`❌ ${error.response.data.detail}`);
      } else {
        message.error('❌ Registration failed. Please try again.');
      }
    }
  };

  return (
    <Form
      form={form}
      name="register"
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter a username' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter an email' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please enter your last name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter a password' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
