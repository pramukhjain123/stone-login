import React, { useState } from 'react';

const AddUserForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username, email, password, isAdmin } = formData;

  const onChange = e => {
    const value = e.target.type === 'checkbox' 
      ? e.target.checked 
      : e.target.value;
    
    setFormData({ ...formData, [e.target.name]: value });
    setErrorMsg('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Validate inputs
    if (!username || !email || !password) {
      setErrorMsg('All fields are required');
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await addUser(formData);
    
    if (result.success) {
      setSuccessMsg('User added successfully');
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        isAdmin: false
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } else {
      setErrorMsg(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4>Add New User</h4>
      </div>
      <div className="card-body">
        {errorMsg && (
          <div className="alert alert-danger">{errorMsg}</div>
        )}
        
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
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
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
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
              required
            />
          </div>
          
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isAdmin"
              name="isAdmin"
              checked={isAdmin}
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="isAdmin">
              Admin Privileges
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm; 