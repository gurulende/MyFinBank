import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert, ListGroup } from 'react-bootstrap';

const UserTransacion = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [transactionsError, setTransactionsError] = useState('');

    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/accounts/getallusersaccount/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Fetched users:', data);
            setUsers(data);
        } catch (error) {
            setError('An error occurred while fetching user data.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchTransactions = async (userId) => {
        try {
            setLoadingTransactions(true);
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
            setTransactionsError('Failed to fetch transactions');
            console.error('Error fetching transactions', err);
        } finally {
            setLoadingTransactions(false);
        }
    };

    const handleShowTransactions = (userId) => {
        setSelectedUserId(userId);
        fetchTransactions(userId);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading users...</p>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h1 className="text-center mb-4">User Details</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        {users.map(({ user, account }) => (
                            <Col md={6} lg={4} key={user._id} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{user.username}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <strong>Account Number:</strong> {account?.accountNumber || 'N/A'}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Amount:</strong> ${account?.amount?.toFixed(2) || 'N/A'}
                                        </Card.Text>
                                        <div className="mt-3">
                                            <Button
                                                onClick={() => handleShowTransactions(user._id)}
                                                variant="outline-primary"
                                            >
                                                Show Transactions
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {selectedUserId && (
                        <Card className="mt-3">
                            <Card.Header>Transactions</Card.Header>
                            <Card.Body>
                                {loadingTransactions && <Spinner animation="border" variant="primary" />}
                                {transactionsError && <Alert variant="danger">{transactionsError}</Alert>}
                                <ListGroup variant="flush">
                                    {transactions.length === 0 ? (
                                        <ListGroup.Item>No transactions found.</ListGroup.Item>
                                    ) : (
                                        transactions.map(transaction => (
                                            <ListGroup.Item key={transaction._id}>
                                                <p><strong>Amount:</strong> ${transaction.amount?.toFixed(2) || 'N/A'}</p>
                                                <p><strong>Sender Account Number:</strong> {transaction.senderAccountId?._id || 'N/A'}</p>
                                                <p><strong>Receiver Account Number:</strong> {transaction.receiverAccountId?._id || 'N/A'}</p>
                                                <p><strong>Date:</strong> {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'N/A'}</p>
                                            </ListGroup.Item>
                                        ))
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserTransacion;
