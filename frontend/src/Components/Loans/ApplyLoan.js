import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyLoan = () => {
    const [amount, setAmount] = useState('');
    const [tenure, setTenure] = useState('');
    const [accountId, setAccountId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [emi, setEmi] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            setError('User is not authenticated');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/loans/apply',
                { amount, tenure, accountId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccess('Loan application submitted successfully');
            setError(null);
            setEmi(response.data.emi);  // Update EMI from response
            // Clear form fields
            setAmount('');
            setTenure('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply for loan');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Apply for Loan</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tenure">Tenure (Months)</label>
                    <input
                        id="tenure"
                        type="number"
                        className="form-control"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-secondary">Apply</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
            {emi && <div className="alert alert-info mt-3">Your EMI: {emi.toFixed(2)}</div>}
        </div>
    );
};

export default ApplyLoan;
