// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';

function Navbar() {
    const { auth, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        

                        {/* Admin Links */}
                        {auth.role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">All Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/allaccounts">All Accounts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/manageloans">Manage Loans</Link>
                                </li>
                            </>
                        )}

                        {/* Customer Links */}
                        {auth.role === 'customer' && (
                            <>
                              <li className="nav-item">
                                  <Link className="nav-link" to="/profiles">Profiles</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard">User Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/applyloan">Apply Loan</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/accountdetails">Account Details</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/calculatemi">Calculate EMI</Link>
                                </li>
                            </>
                        )}

                        {/* Auth Links */}
                        {auth.token ? (
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
