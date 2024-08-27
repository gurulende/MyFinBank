import React, { useState } from 'react';
import axios from 'axios';

const AccountCreation = ({ onAccountCreated }) => {
    const [amount, setAmount] = useState('');  // Corrected to `setAmount`
    const [accountType, setAccountType] = useState('Savings');
    const [accountCreationError, setAccountCreationError] = useState(null);
    const [accountCreationMessage, setAccountCreationMessage] = useState(null);

    const token = localStorage.getItem('token');

    const handleAccountCreation = async (e) => {
        e.preventDefault();

        if (!amount || amount <= 0) {
            setAccountCreationError('Initial amount must be greater than 0');
            return;
        }

        try {
            const accountData = {
                amount: parseFloat(amount),  // Use `amount` to match Mongoose schema
                type: accountType,
            };

            const response = await axios.post('http://localhost:5000/api/accounts/', accountData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const newAccountId = response.data._id;
            onAccountCreated(newAccountId); // Pass account ID to parent component
            setAccountCreationMessage('Account created successfully');
            setAmount('');  // Corrected to `setAmount`
            setAccountType('Savings');
        } catch (err) {
            setAccountCreationError(err.response?.data?.message || 'Failed to create account');
            console.error('Error creating account', err);
        }
    };

    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleAccountCreation}>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Initial amount</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}  // Corrected to `setAmount`
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountType" className="form-label">Account Type</label>
                    <select
                        id="accountType"
                        className="form-select"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
            {accountCreationError && <div className="alert alert-danger mt-3">{accountCreationError}</div>}
            {accountCreationMessage && <div className="alert alert-success mt-3">{accountCreationMessage}</div>}
        </div>
    );
};

export default AccountCreation;
