import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoanManagement = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/loans/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoans(response.data);
            } catch (err) {
                setError('Failed to fetch loans');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, [token]);

    
    const handleStatusUpdate = async (loanId, newStatus) => {
        setUpdating(true);
        setError(null); 
        try {
            const response = await axios.put(
                `http://localhost:5000/api/loans/update/${loanId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
           
            setLoans(loans.map(loan => loan._id === loanId ? { ...loan, status: newStatus } : loan));
        } catch (err) {
           
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            } else {
                setError('Failed to update loan status');
            }
        } finally {
            setUpdating(false);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container">
        <h2>Loan Management</h2>
    
        {error && <div className="alert alert-danger">{error}</div>}
    
        <h3 className="mt-4">Loan Applications</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Loan ID</th>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Tenure</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {loans.map((loan) => (
                    <tr key={loan._id}>
                        <td>{loan._id}</td>
                        <td>${loan.amount.toFixed(2)}</td>
                        <td>{loan.interestRate}%</td>
                        <td>{loan.tenure} months</td>
                        <td>{loan.status}</td>
                        <td>
                            <select
                                value={loan.status}
                                onChange={(e) => handleStatusUpdate(loan._id, e.target.value)}
                                className="form-control"
                                disabled={updating}
                            >
                                <option value="" disabled>Select status</option>
                                <option value="Approved">Approve</option>
                                <option value="Declined">Decline</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    );
};

export default LoanManagement;
