import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/accounts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch accounts');
                console.error('Error fetching accounts', err);
            }
        };

        fetchAccounts();
    }, [token]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Accounts List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Account ID</th>
                            <th>Account Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.length > 0 ? (
                            accounts.map(account => (
                                <tr key={account._id}>
                                    <td>{account._id}</td>
                                    <td>{account.type}</td>
                                    <td>{account.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No accounts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Accounts;
