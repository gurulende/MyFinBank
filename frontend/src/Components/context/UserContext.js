import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // or your preferred method for making API calls

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Fetch user data based on the token
    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('/api/user/profile', { 
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user data", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
