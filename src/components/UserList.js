import React, { useState } from 'react';

const UserList = ({ users, updateUserPassword, deleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openPasswordModal = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setErrorMsg('');
  };

  const closePasswordModal = () => {
    setSelectedUser(null);
    setNewPassword('');
    setErrorMsg('');
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setErrorMsg('');
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword) {
      setErrorMsg('Password cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await updateUserPassword(selectedUser._id, newPassword);
    
    if (result.success) {
      closePasswordModal();
      setSuccessMsg(`Password updated for ${selectedUser.username}`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } else {
      setErrorMsg(result.error);
    }
    
    setIsSubmitting(false);
  };

  const handleDeleteUser = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete ${username}?`)) {
      const result = await deleteUser(userId);
      
      if (result.success) {
        setSuccessMsg(`User ${username} deleted successfully`);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMsg('');
        }, 3000);
      } else {
        setErrorMsg(result.error);
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setErrorMsg('');
        }, 3000);
      }
    }
  };

  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div>
      {errorMsg && (
        <div className="alert alert-danger">{errorMsg}</div>
      )}
      
      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openPasswordModal(user)}
                  >
                    Change Password
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteUser(user._id, user.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Password Change Modal */}
      {selectedUser && (
        <div className="modal-backdrop show"></div>
      )}
      
      <div className={`modal ${selectedUser ? 'd-block' : ''}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Change Password for {selectedUser?.username}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closePasswordModal}
              ></button>
            </div>
            <div className="modal-body">
              {errorMsg && (
                <div className="alert alert-danger">{errorMsg}</div>
              )}
              
              <form onSubmit={handleSubmitPassword}>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closePasswordModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitPassword}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList; 