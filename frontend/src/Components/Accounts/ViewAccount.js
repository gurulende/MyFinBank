import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewAccount = () => {
    const { id } = useParams();
    const [account, setAccount] = useState({});
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/accounts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAccount(response.data);
            } catch (err) {
                setError('Failed to fetch account details');
            }
        };
        fetchAccount();
    }, [id, token]);

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}
            <h2>Account Details</h2>
            <p><strong>Account Number:</strong> {account.accountNumber}</p>
            <p><strong>Type:</strong> {account.type}</p>
            <p><strong>Amount:</strong> {account.amount}</p>
        </div>
    );
};

export default ViewAccount;
