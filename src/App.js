import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Control panel URL - can be changed via environment variable
const CONTROL_PANEL_URL = process.env.REACT_APP_CONTROL_PANEL_URL || 'https://clear-macaque-recently.ngrok-free.app/';

// Control Panel redirect component
const ControlPanelRedirect = () => {
  React.useEffect(() => {
    window.location.href = CONTROL_PANEL_URL;
  }, []);
  
  return <div className="text-center mt-5">Redirecting to Control Panel...</div>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/control-panel" 
              element={
                <PrivateRoute>
                  <ControlPanelRedirect />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
