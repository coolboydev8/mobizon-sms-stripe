import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateGameRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('role_option') === '2';
  return isAuthenticated ? element : <Navigate to="/oops" />;
};

export default PrivateGameRoute;

