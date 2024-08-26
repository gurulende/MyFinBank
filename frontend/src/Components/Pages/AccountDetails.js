import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountDetails = () => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/accounts/getdetails/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAccount(response.data);
            } catch (err) {
                setError('Failed to fetch account details');
            } finally {
                setLoading(false);
            }
        };

        fetchAccountDetails();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="alert alert-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Account Details</h2>
            <div className="card">
                <div className="card-body">
                    {account ? (
                        <div>
                            <h5 className="card-title">Account Information</h5>
                            <p className="card-text"><strong>Account Number:</strong> {account._id}</p>
                            <p className="card-text"><strong>Account Type:</strong> {account.type}</p>
                            <p className="card-text"><strong>Balance:</strong> ${account.amount.toFixed(2)}</p>
                            <p className="card-text"><strong>User ID:</strong> {account.user}</p>
                        </div>
                    ) : (
                        <p className="text-center">No account details available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
