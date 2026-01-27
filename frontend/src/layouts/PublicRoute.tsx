import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

export const PublicRoute = () => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to={'/home'} replace />;
  }

  return <Outlet />;
};
