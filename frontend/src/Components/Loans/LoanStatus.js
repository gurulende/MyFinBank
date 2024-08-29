import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoanStatus.css'; 

const LoanStatus = () => {
    const [accountId, setAccountId] = useState('');
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/accounts/getdetails/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && response.data._id) {
                    setAccountId(response.data._id);
                } else {
                    setError('No account found for the user');
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch account details');
            } finally {
                setLoading(false);
            }
        };

        fetchAccountId();
    }, []);

    useEffect(() => {
        if (!accountId) return; 

        const fetchLoanStatus = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/loans/customer/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.loans) {
                    setLoans(response.data.loans);
                } else {
                    setError('No loans found for the user');
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch loan status');
            } finally {
                setLoading(false);
            }
        };

        fetchLoanStatus();
    }, [accountId]);

    return (
        <div className="container mt-4">
            <h2>Your Loan Status</h2>
            {loading && <div className="alert alert-info mt-3">Loading...</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {loans.length === 0 && !error && !loading && <div className="alert alert-info mt-3">No loans found</div>}
            {loans.length > 0 && !loading && (
                <div className="row">
                    {loans.map((loan) => (
                        <div className="col-md-4 mb-4" key={loan._id}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Loan Details</h5>
                                    <p className="card-text"><strong>Amount:</strong> ${loan.amount}</p>
                                    <p className="card-text"><strong>Tenure:</strong> {loan.tenure} months</p>
                                    <p className="card-text"><strong>Status:</strong> {loan.status}</p>
                                    <p className="card-text"><strong>EMI:</strong> ${loan.emi ? loan.emi.toFixed(2) : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LoanStatus;
