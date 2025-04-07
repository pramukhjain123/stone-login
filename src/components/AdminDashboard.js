import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import AddUserForm from './AddUserForm';

// API base URL - will use environment variable in production or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/admin/users`);
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError('Error fetching users: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/api/admin/users`, userData);
      setUsers([...users, res.data.user]);
      setShowAddForm(false);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.msg || 'Failed to add user'
      };
    }
  };

  // Update user password
  const updateUserPassword = async (userId, newPassword) => {
    try {
      await axios.put(`${API_URL}/api/admin/users/password`, {
        userId,
        newPassword
      });
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.msg || 'Failed to update password'
      };
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/api/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.msg || 'Failed to delete user'
      };
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading users...</div>;
  }

  return (
    <div className="card">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h3>Admin Dashboard</h3>
        <button 
          className="btn btn-light" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {showAddForm && (
          <div className="mb-4">
            <AddUserForm addUser={addUser} />
          </div>
        )}

        <h4>Manage Users</h4>
        <UserList 
          users={users} 
          updateUserPassword={updateUserPassword}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
};

export default AdminDashboard; 