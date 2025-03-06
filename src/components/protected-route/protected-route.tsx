import { FC } from 'react';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../slice/stellarBurgerSlice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  loginRequired: boolean;
};

export const ProtectedRoute = ({
  children,
  loginRequired
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (loginRequired && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (!loginRequired && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
