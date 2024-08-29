import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PublicRoutes from './Components/Routes/PublicRoutes';
import AdminRoutes from './Components/Routes/AdminRoutes';
import CustomerRoutes from './Components/Routes/CustomerRoutes';
import { AuthProvider, useAuth } from './Components/context/authContext';
import './App.css';

const AppContent = () => {
    const { auth } = useAuth(); 

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="flex-grow-1">
                {auth.token ? (
                    auth.role === 'admin' ? <AdminRoutes /> : <CustomerRoutes />
                ) : (
                    <PublicRoutes />
                )}
            </div>
            <Footer />
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <Router>
            <AppContent />
        </Router>
    </AuthProvider>
);

export default App;

