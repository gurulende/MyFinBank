// src/Components/FixedDeposit/FixedDepositForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FixedDepositForm = () => {
    const [accountId, setAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [interestRate, setInterestRate] = useState(7); // Set default interest rate to 7%
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

    const handleCreateFD = async (e) => {
        e.preventDefault();

        if (!amount || !term) {
            setError('Amount and Term are required');
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
                'http://localhost:5000/api/fixedDeposit/create',
                { accountId, amount, term, interestRate },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            setAmount('');
            setTerm('');
            setInterestRate(7); // Reset to default value
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create Fixed Deposit');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Fixed Deposit</h2>
            <form onSubmit={handleCreateFD}>
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
                <div className="mb-3">
                    <label htmlFor="term" className="form-label">Term (months):</label>
                    <input
                        type="number"
                        id="term"
                        className="form-control"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder="Enter Term"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="interestRate" className="form-label">Interest Rate (%):</label>
                    <input
                        type="number"
                        step="0.01"
                        id="interestRate"
                        className="form-control"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Enter Interest Rate"
                        readOnly // Make the field read-only if you want to enforce the default interest rate
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Create Fixed Deposit'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
    );
};

export default FixedDepositForm;
