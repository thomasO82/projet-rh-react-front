import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import verifyToken from '../../utils/verifToken';

const PrivateRoute = () => {
  const [authState, setAuthState] = useState({ isAuthenticated: null, isLoading: true });



  useEffect(() => {

    if (verifyToken()) {
      setAuthState({ isAuthenticated: true, isLoading: false });

    }else{
      setAuthState({ isAuthenticated: false, isLoading: false });

    }
  }, []);

  if (authState.isLoading) {
    return <div>Chargement, veuillez patienter</div>;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;