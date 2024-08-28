import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSpinner } from 'react-icons/fa';

const AccountDetails = () => {
    const [account, setAccount] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch account details
                const accountResponse = await axios.get('http://localhost:5000/api/accounts/getdetails/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAccount(accountResponse.data);

                // Fetch user profile
                const userResponse = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(userResponse.data);

            } catch (err) {
                setError('Failed to fetch account or user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div className="text-center mt-5">
            <FaSpinner size={50} className="text-primary spinner" />
            <p className="mt-3">Loading...</p>
        </div>
    );
    
    if (error) return (
        <div className="text-center mt-5">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Account Details</h2>
            <div className="card shadow-lg border-primary">
                <div className="card-body">
                    {account && user ? (
                        <div>
                            <h5 className="card-title mb-3">Account Information</h5>
                            <div className="mb-3">
                                <p className="card-text"><strong>Account Number:</strong> <span className="text-muted">{account._id}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="card-text"><strong>Account Type:</strong> <span className="text-muted">{account.type}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="card-text"><strong>Balance:</strong> <span className="text-success">${account.amount.toFixed(2)}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="card-text"><strong>User ID:</strong> <span className="text-muted">{account.user}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="card-text"><strong>Username:</strong> <span className="text-muted">{user.username}</span></p>
                            </div>
                            <div className="mb-3">
                                <p className="card-text"><strong>Phone Number:</strong> <span className="text-muted">{user.phoneNumber}</span></p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">No account or user details available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
