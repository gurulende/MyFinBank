import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deposit = () => {
    const [accountId, setAccountId] = useState(''); 
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
                    setAccountId(response.data._id);
                } else {
                    setError('No account found for the user');
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch account details');
            }
        };

        fetchAccountId();
    }, []);

    const handleDeposit = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        if (!accountId.trim()) {
            setError('Account ID is missing');
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
                `http://localhost:5000/api/transactions/${accountId}/deposit`, 
                { amount: parseFloat(amount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(`Deposit successful. New balance: ${response.data.balance}`);
            setAmount('');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to deposit');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Deposit</h2>
            {accountId ? (
                <form onSubmit={handleDeposit}>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Deposit'}
                    </button>
                </form>
            ) : (
                <div>Loading account information...</div>
            )}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
    );
};

export default Deposit;

