import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {UserContext} from "../context/user.context.jsx";

const AdminRoute = ({ children }) => {
  const {currentUser} = useContext(UserContext);

  if (!currentUser) {
    // Not logged in
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
