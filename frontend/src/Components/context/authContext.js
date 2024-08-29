import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, role: null, username: null, isAuthenticated: false });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userRole = payload.role;
                const username = payload.username;
                setAuth({ token, role: userRole, username, isAuthenticated: true });
            } catch (error) {
                console.error('Invalid token', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userRole = payload.role;
            const username = payload.username;
            setAuth({ token, role: userRole, username, isAuthenticated: true });
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Invalid token', error);
        }
    };

    const logout = () => {
        setAuth({ token: null, role: null, username: null, isAuthenticated: false });
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
