import React, { useState } from 'react';
import axios from 'axios';

const ApplyLoan = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [accountId, setAccountId] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
                { amount, interestRate, tenure, accountId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccess('Loan application submitted successfully');
            setError(null);
            // Clear form fields
            setAmount('');
            setInterestRate('');
            setTenure('');
            setAccountId('');
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
                    <label htmlFor="interestRate">Interest Rate</label>
                    <input
                        id="interestRate"
                        type="number"
                        className="form-control"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="accountId">Account ID</label>
                    <input
                        id="accountId"
                        type="text"
                        className="form-control"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Apply</button>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
};

export default ApplyLoan;
