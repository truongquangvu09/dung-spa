import React from 'react';

import useAuth from './../CustomHooks/useAuth';

import { Navigate } from 'react-router-dom';

const ProtectedRouter = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/Login" />;
};

export default ProtectedRouter;
