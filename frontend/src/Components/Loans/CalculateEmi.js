import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CalculateEMI = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('14'); // Set default interest rate to 14%
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
            setError('Failed to calculate EMI. Please check your input.');
            setEmi(null);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Calculate EMI</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="amount">Loan Amount</label>
                    <input
                        type="number"
                        id="amount"
                        className="form-control"
                        placeholder="Enter loan amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="interestRate">Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        className="form-control"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                        readOnly // Make the input read-only
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="tenure">Tenure (months)</label>
                    <input
                        type="number"
                        id="tenure"
                        className="form-control"
                        placeholder="Enter tenure in months"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Calculate EMI</button>
            </form>
            {emi !== null && (
                <div className="mt-4 alert alert-success">
                    <h4 className="mb-2">Calculated EMI</h4>
                    <p><strong>EMI Amount:</strong> ${emi.toFixed(2)}</p>
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
