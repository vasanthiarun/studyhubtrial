import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from "../context/user.context.jsx";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    // You can return a loader/spinner or null while checking auth
    return <div>Loading...</div>;
  }


  if (!currentUser) {
    // Not logged in
    console.log('redirecting');
    return <Navigate to="/login" replace />;
  }

  if (currentUser.roles !== 'admin') {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};

export default AdminRoute;
