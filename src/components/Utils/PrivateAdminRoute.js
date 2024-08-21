import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateAdminRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken') === '12345';
  return isAuthenticated ? element : <Navigate to="/oops" />;
};

export default PrivateAdminRoute;

