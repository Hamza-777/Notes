import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { userLoggedIn } = useAppSelector((state) => state.auth);
  return userLoggedIn ? children : <Navigate to='/' />;
};

export default PrivateRoute;
