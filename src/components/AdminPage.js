import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/server/login', { password });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/server/change-password', { newPassword });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default AdminPage;