import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecurringDepositForm = () => {
    const [accountId, setAccountId] = useState('');
    const [monthlyAmount, setMonthlyAmount] = useState('');
    const [term, setTerm] = useState('');
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

    const handleCreateRD = async (e) => {
        e.preventDefault();

        if (!monthlyAmount || !term) {
            setError('Monthly Amount and Term are required');
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
                'http://localhost:5000/api/recurringDeposit/create',
                { accountId, monthlyAmount, term }, // Interest rate is fixed at 8%
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            setMonthlyAmount('');
            setTerm('');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create Recurring Deposit');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Recurring Deposit</h2>
            <form onSubmit={handleCreateRD}>
                <div className="mb-3">
                    <label htmlFor="monthlyAmount" className="form-label">Monthly Amount:</label>
                    <input
                        type="number"
                        id="monthlyAmount"
                        className="form-control"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(e.target.value)}
                        placeholder="Enter Monthly Amount"
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
                        value={8} // Fixed interest rate
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Processing...' : 'Create Recurring Deposit'}
                </button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
    );
};

export default RecurringDepositForm;
