import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';

const UserAccountsList = () => {
    const [userAccounts, setUserAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAccounts = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                const { data } = await axios.get('http://localhost:5000/api/accounts/getallusersaccount/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log(data); // Log the data to inspect its structure

                setUserAccounts(data);
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while fetching user and account data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAccounts();
    }, []);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={10}>
                    <h1 className="text-center mb-4">Customer Accounts</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row>
                        {userAccounts.map(({ user, account }) => (
                            <Col md={6} lg={4} key={user._id} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{user.username}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Email: {user.email}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            Phone Number: {user.phoneNumber}
                                        </Card.Text>
                                        <Card.Text>
                                            Status: {user.status}
                                        </Card.Text>
                                        {account ? (
                                            <>
                                                <Card.Text>
                                                    <strong>Account Number:</strong> {account.accountId || 'N/A'}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Amount:</strong> ${account.amount.toFixed(2)}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Type:</strong> {account.type}
                                                </Card.Text>
                                                <Card.Text>
                                                    <strong>Transactions:</strong> {account.transactions.length}
                                                </Card.Text>
                                            </>
                                        ) : (
                                            <Alert variant="warning">No account information available.</Alert>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserAccountsList;
