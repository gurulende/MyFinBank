import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/accounts/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch accounts');
            }
        };
        fetchAccounts();
    }, [token]);

    const handleView = (id) => navigate(`/accountdetails/${id}`);
    const handleEdit = (id) => navigate(`/editaccount/${id}`);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/accounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccounts(accounts.filter(account => account._id !== id));
        } catch (err) {
            setError('Failed to delete account');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Accounts</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {accounts.length > 0 ? (
                    accounts.map(account => (
                        <div className="col-md-4 mb-4" key={account._id}>
                            <div className="card account-card">
                                <div className="card-body">
                                    <h5 className="card-title">Account Number: {account._id}</h5>
                                    <p className="card-text">Type: {account.type}</p>
                                    <p className="card-text">Amount: ${account.amount.toFixed(2)}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleView(account._id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleEdit(account._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(account._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No accounts found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAccounts;
