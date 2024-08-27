import React, { useState } from 'react';
import axios from 'axios';

const CalculateEMI = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [emi, setEmi] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/loans/emi', {
                amount,
                interestRate,
                tenure
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setEmi(response.data.emi);
            setError(null);
        } catch (err) {
            setError('Failed to calculate EMI');
            setEmi(null);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Calculate EMI</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Loan Amount</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        className="form-control"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tenure">Tenure (months)</label>
                    <input
                        type="number"
                        id="tenure"
                        className="form-control"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Calculate EMI</button>
            </form>
            {emi !== null && (
                <div className="mt-4 alert alert-success">
                    <h4>Calculated EMI</h4>
                    <p>EMI Amount: ${emi.toFixed(2)}</p>
                </div>
            )}
            {error && (
                <div className="mt-4 alert alert-danger">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default CalculateEMI;
