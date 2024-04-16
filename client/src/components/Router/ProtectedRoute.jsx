import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const ProtectedRoute = ({ path, ...props }) => {
  const [auth] = useAuth();

  return auth.user ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/Login-staff" replace />
  );
};

export default ProtectedRoute;
