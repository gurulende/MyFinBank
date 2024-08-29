import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';
import './Navbar.css'; // Ensure this CSS file is correctly linked

function Navbar() {
    const { auth, logout } = useAuth();

    const handleProfileClick = () => {
        // Redirect to customer profile or dashboard
        window.location.href = '/accountdetails'; // or adjust path accordingly
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyFIN Bank</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>

                        {/* Admin Links */}
                        {auth.role === 'admin' && (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle" 
                                    href="/" 
                                    id="adminDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    Admin
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                                    <li><Link className="dropdown-item" to="/admin-dashboard">Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/adminchat">Chat</Link></li>
                                    <li><Link className="dropdown-item" to="/emailnotification">Email</Link></li>
                                </ul>
                            </li>
                        )}

                        {/* Customer Links */}
                        {auth.role === 'customer' && (
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle" 
                                    href="/" 
                                    id="customerDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    Customer
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="customerDropdown">
                                    <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                                    <li><Link className="dropdown-item" to="/applyloan">Apply Loan</Link></li>
                                    <li><Link className="dropdown-item" to="/calculatemi">Calculate EMI</Link></li>
                                    <li><Link className="dropdown-item" to="/customerchat">Chat</Link></li>
                                    <li><Link className="dropdown-item" to="/profiles">Update Profile</Link></li>
                                </ul>
                            </li>
                        )}

                        {/* Auth Links */}
                        <li className="nav-item auth-links">
                            {auth.token ? (
                                <button 
                                    className="nav-link btn btn-link text-light" 
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="auth-buttons">
                                    <Link className="nav-link btn btn-outline-light" to="/register">Register</Link>
                                    <Link className="nav-link btn btn-outline-light" to="/login">Login</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                    {/* Profile Icon - Only for customers */}
                    {auth.token && auth.role === 'customer' && (
                        <div className="d-flex align-items-center">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="24" 
                                height="24" 
                                fill="currentColor" 
                                className="bi bi-person-circle profile-icon" 
                                viewBox="0 0 16 16" 
                                onClick={handleProfileClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
