import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Spinner, Alert } from 'react-bootstrap';

const TransactionList = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!userId) return; 

        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get(`http://localhost:5000/api/transactions/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

          
                console.log('Fetched transactions:', data);

                if (Array.isArray(data)) {
                    setTransactions(data);
                } else {
                    throw new Error('Expected an array of transactions');
                }
            } catch (err) {
                setError('Failed to fetch transactions');
                console.error('Error fetching transactions', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId]);

    if (!userId) return null; 

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Card className="mt-3">
            <Card.Header>Transactions</Card.Header>
            <ListGroup variant="flush">
                {transactions.length === 0 ? (
                    <ListGroup.Item>No transactions found.</ListGroup.Item>
                ) : (
                    transactions.map(transaction => (
                        <ListGroup.Item key={transaction._id}>
                            <p><strong>Type:</strong> {transaction.type || 'N/A'}</p>
                            <p><strong>Amount:</strong> ${transaction.amount?.toFixed(2) || 'N/A'}</p>
                            <p><strong>Sender Account:</strong> {transaction.senderAccountId?.accountId || 'N/A'}</p>
                            <p><strong>Receiver Account:</strong> {transaction.receiverAccountId?.accountId || 'N/A'}</p>
                            <p><strong>Date:</strong> {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'}</p>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Card>
    );
};

export default TransactionList;
