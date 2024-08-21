import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateUserRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authUser') === '12345';
  return isAuthenticated ? element : <Navigate to="/oops" />;
};

export default PrivateUserRoute;
