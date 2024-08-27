import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountDetails = () => {
    const [account, setAccount] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
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
                setError('Failed to fetch account or user details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="alert alert-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Account Details</h2>
            <div className="card">
                <div className="card-body">
                    {user && account ? (
                        <div>
                            <h5 className="card-title">User Information</h5>
                            <p className="card-text"><strong>Username:</strong> {user.username}</p>
                            <p className="card-text"><strong>Phone Number:</strong> {user.phoneNumber}</p>

                            <h5 className="mt-4">Account Information</h5>
                            <p className="card-text"><strong>Account Number:</strong> {account._id}</p>
                            <p className="card-text"><strong>Account Type:</strong> {account.type}</p>
                            <p className="card-text"><strong>Balance:</strong> ${account.amount.toFixed(2)}</p>
                            <p className="card-text"><strong>User ID:</strong> {account.user}</p>
                        </div>
                    ) : (
                        <p className="text-center">No details available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
