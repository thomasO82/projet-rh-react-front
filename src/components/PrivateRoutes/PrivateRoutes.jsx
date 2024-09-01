import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import verifyToken from '../../utils/verifToken';

const PrivateRoute = () => {
  const [authState, setAuthState] = useState({ isAuthenticated: null, isLoading: true });

  useEffect(() => {
    const auth = async () => {
      try {
        const isAuthenticated = await verifyToken();
        setAuthState({ isAuthenticated, isLoading: false });
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        setAuthState({ isAuthenticated: false, isLoading: false });
      }
    };
    auth();
  }, [verifyToken]);

  if (authState.isLoading) {
    return <div>Chargement, veuillez patienter</div>;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute