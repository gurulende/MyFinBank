import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ element, roles }) => {
    const { auth } = useAuth();

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(auth.role)) {
        return <Navigate to="/" />;
    }

    return element;
};

export default ProtectedRoute;
