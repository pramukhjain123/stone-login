import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  
  const { login, error, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already authenticated, redirect
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
    
    // Set error message from context if it exists
    if (error) {
      setLoginError(error);
    }
  }, [isAuthenticated, isAdmin, error, navigate]);
  
  const { username, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError('');
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (!username || !password) {
      setLoginError('Please enter both username and password');
      return;
    }
    
    const success = await login(username, password);
    
    if (success) {
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  };
  
  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Login</h2>
            
            {loginError && (
              <div className="alert alert-danger" role="alert">
                {loginError}
              </div>
            )}
            
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 