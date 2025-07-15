import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Typography, Button } from 'antd';
import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn, user } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${user.name}'s tasks` : 'Voice Recorder';
  }, [isLoggedIn, user]);

  return (
    <MainLayout>
      <Content style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {!isLoggedIn ? (
          <div
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '12px',
              padding: '40px 24px',
              textAlign: 'center',
              color: '#fff',
              marginTop: '80px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Title level={3} style={{ color: '#fff', marginBottom: '20px' }}>
              Please log in first to record your voice.
            </Title>
            <Link to="/login">
              <Button type="primary" size="large" style={{ padding: '10px 32px' }}>
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/voice/add">
              <Button type="primary" size="large" style={{ padding: '12px 32px', fontSize: '16px' }}>
                Record New Voice
              </Button>
            </Link>
          </div>
        )}
      </Content>
    </MainLayout>
  );
};

export default Home;
