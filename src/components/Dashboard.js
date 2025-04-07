import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3>User Dashboard</h3>
      </div>
      <div className="card-body">
        <h4>Welcome, {user?.username}!</h4>
        <p>You have successfully logged in.</p>
        
        <div className="mt-4">
          <h5>Your Information:</h5>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              <strong>Username:</strong> {user?.username}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {user?.email}
            </li>
            <li className="list-group-item">
              <strong>Account Type:</strong> {user?.isAdmin ? 'Administrator' : 'Standard User'}
            </li>
          </ul>
          
          <div className="d-grid gap-2 mt-4">
            <Link to="/control-panel" className="btn btn-danger btn-lg">
              Access Control Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 