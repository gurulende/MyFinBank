import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, role: null });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userRole = JSON.parse(atob(token.split('.')[1])).role;
            setAuth({ token, role: userRole });
        }
    }, []);

    const login = (token) => {
        const userRole = JSON.parse(atob(token.split('.')[1])).role;
        setAuth({ token, role: userRole });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuth({ token: null, role: null });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
