import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.message); 
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2 className="title">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <div>
            <label className="auth-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div>
            <label className="auth-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;