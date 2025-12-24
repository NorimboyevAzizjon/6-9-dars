import React from 'react';
import LoginModal from '../components/Auth/LoginModal';


import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.error);
    }
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div style={{textAlign: 'center', marginTop: 60}}>
      <LoginModal isOpen={true} onClose={() => navigate('/')} onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
