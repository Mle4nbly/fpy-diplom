import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

export const PrivateRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={'/auth/login'} replace />;
  }

  return <Outlet />;
};
