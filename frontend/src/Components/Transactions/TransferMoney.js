import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transfer = () => {
    const [senderId, setSenderId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/accounts/getdetails/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data) {
                    setSenderId(response.data._id);
                } else {
                    setError('No account found for the user');
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch account details');
            }
        };

        fetchAccountId();
    }, []);

    const handleTransfer = async (e) => {
        e.preventDefault();

        if (!receiverId || !amount) {
            setError('All fields are required');
            return;
        }

        if (amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/transactions/transfer',
                { senderId, receiverId, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            setReceiverId('');
            setAmount('');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to transfer');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Transfer Money</h2>
            <form onSubmit={handleTransfer}>
               
                <div className="mb-3">
                    <label htmlFor="receiverId" className="form-label">Send to:</label>
                    <input
                        type="text"
                        id="receiverId"
                        className="form-control"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        placeholder="Enter Receiver Account ID"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Transfer'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
    );
};

export default Transfer;

