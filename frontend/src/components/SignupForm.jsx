import React, { useState } from 'react';
import { Form, Input, Button, Typography, Spin, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';

const { Title } = Typography;

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateManyFields('signup', formData);
    setFormErrors({});
    
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: '/auth/signup', method: 'post', data: formData };

    try {
      await fetchData(config); 
      navigate('/login');
    } catch (error) {
    
      if (error.response?.data?.msg) {
        setFormErrors({ email: error.response.data.msg }); 
      } else {
        message.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '64px auto',
        padding: '24px',
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {loading ? (
        <Spin
          size="large"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        />
      ) : (
        <>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
            Please Signup Here
          </Title>

          <Form layout="vertical">
            {/* Name Field */}
            <Form.Item
              label="Name"
              required
              validateStatus={formErrors.name ? 'error' : ''}
              help={formErrors.name}
            >
              <Input
                name="name"
                value={formData.name}
                placeholder="Your name"
                onChange={handleChange}
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label="Email"
              required
              validateStatus={formErrors.email ? 'error' : ''}
              help={formErrors.email}
            >
              <Input
                name="email"
                value={formData.email}
                placeholder="youremail@domain.com"
                onChange={handleChange}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              required
              validateStatus={formErrors.password ? 'error' : ''}
              help={formErrors.password}
            >
              <Input.Password
                name="password"
                value={formData.password}
                placeholder="Your password.."
                onChange={handleChange}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  backgroundColor: '#1890ff', 
                  borderColor: '#1890ff',
                  color: '#fff', 
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/login" style={{ color: '#40a9ff' }}>
              Already have an account? Login here
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SignupForm;
