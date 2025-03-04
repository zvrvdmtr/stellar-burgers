import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../slice/stellarBurgerSlice';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  loginRequired: boolean;
};

export const ProtectedRoute = ({
  children,
  loginRequired
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (loginRequired && !isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  if (!loginRequired && isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }

  return children;
};
