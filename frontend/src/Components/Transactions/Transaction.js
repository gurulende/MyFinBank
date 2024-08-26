import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTransactions(response.data);
            } catch (err) {
                setError('Failed to fetch transactions');
                console.error('Error fetching transactions', err);
            }
        };

        fetchTransactions();
    }, [token]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>My Transactions</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction._id}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                <td>{transaction.senderAccountId ? 'Withdrawal' : 'Deposit'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No transactions available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transaction;
