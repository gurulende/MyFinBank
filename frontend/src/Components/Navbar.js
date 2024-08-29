import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';
import './Navbar.css'; 

function Navbar() {
    const { auth, logout } = useAuth();

    const handleProfileClick = () => {
        window.location.href = '/accountdetails';
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
                                    <li><Link className="dropdown-item" to="/usertransaction">User Transaction</Link></li>
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
                                    <li><Link className="dropdown-item" to="/loanstatus">Loan Status</Link></li>
                                    <li><Link className="dropdown-item" to="/transactionhistory">Transaction History</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {auth.isAuthenticated ? (
                            <>
                                {auth.role === 'customer' && (
                                    <button className="btn btn-outline-success me-2" onClick={handleProfileClick}>Profile</button>
                                )}
                                <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <Link className="btn btn-outline-primary" to="/login">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
