import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Import useAuth to call logout

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get logout function from context

    useEffect(() => {
        logout(); // Clear auth state
        navigate('/login'); // Redirect to login page
    }, [logout, navigate]);

    return (
        <div className="text-center mt-5">
            <h2>Logged out</h2>
            <p>You have been logged out. Redirecting to login page...</p>
        </div>
    );
};

export default Logout;
