import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsList = () => {
    const [transactions, setTransactions] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTransactions(response.data);
            } catch (err) {
                setFetchError(err.response?.data?.message || 'Failed to fetch transactions');
                console.error('Error fetching transactions', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <p>Loading transactions...</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">All Transactions</h2>
            {fetchError && <div className="alert alert-danger">{fetchError}</div>}
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => {
                                // Determine transaction type
                                const type = transaction.senderAccountId && transaction.receiverAccountId
                                    ? 'Transfer'
                                    : transaction.senderAccountId
                                        ? 'Withdrawal'
                                        : 'Deposit';
                                
                                return (
                                    <tr key={transaction._id}>
                                        <td>{transaction._id}</td>
                                        <td>${transaction.amount.toFixed(2)}</td>
                                        <td>{type}</td>
                                        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TransactionsList;
