import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, Button, Spinner } from 'react-bootstrap';

const UserAccountsList = () => {
    const [userAccounts, setUserAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    const fetchUserAccounts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/accounts/getallusersaccount/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(data);
            setUserAccounts(data);
        } catch (error) {
            setError('An error occurred while fetching user and account data.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAccounts();
    }, []);

    const handleActivate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${id}/activate`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUserAccounts();
        } catch (err) {
            setError('Failed to activate user');
            console.error('Error activating user', err);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${id}/deactivate`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUserAccounts();
        } catch (err) {
            setError('Failed to deactivate user');
            console.error('Error deactivating user', err);
        }
    };

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
                                                    <strong>Account Number:</strong> {account.accountId|| 'N/A'}
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
                                        <div className="mt-3">
                                            {user.status === 'active' ? (
                                                <Button 
                                                    onClick={() => handleDeactivate(user._id)} 
                                                    variant="outline-warning"
                                                >
                                                    Deactivate
                                                </Button>
                                            ) : (
                                                <Button 
                                                    onClick={() => handleActivate(user._id)} 
                                                    variant="outline-success"
                                                >
                                                    Activate
                                                </Button>
                                            )}
                                        </div>
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
