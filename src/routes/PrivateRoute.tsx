import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  role: 'admin' | 'user';
  children: ReactNode;
}

const PrivateRoute = ({ role, children }: Props) => {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (userRole !== role) return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};

export default PrivateRoute;
