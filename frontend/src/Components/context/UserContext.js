// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

function Navbar() {
    const { auth, logout } = useAuth();
    const { user } = useUser();

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
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">Profiles</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/depositwithdraw">ATM</Link>
                        </li>

                        {auth.token ? (
                            <>
                                {auth.role === 'admin' && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/users">All Users</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/account">Account</Link>
                                        </li>
                                    </>
                                )}
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                                </li>
                                {user && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">My Profile</Link>
                                    </li>
                                )}
                            </>
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
