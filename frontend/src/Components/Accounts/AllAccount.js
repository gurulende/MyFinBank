import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import './AllAccount.css'; // Import a custom CSS file for additional styling

const AllAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/accounts/all/acc', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAccounts(response.data);
            } catch (err) {
                setError('Failed to fetch accounts');
            }
        };
        fetchAccounts();
    }, [token]);

    const handleView = (id) => navigate(`/accountdetails/${id}`);
    const handleEdit = (id) => navigate(`/editaccount/${id}`);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/accounts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccounts(accounts.filter(account => account.accountId !== id));
        } catch (err) {
            setError('Failed to delete account');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">All Accounts</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                {accounts.length > 0 ? (
                    accounts.map(account => (
                        <Col md={4} sm={6} xs={12} key={account.accountId} className="mb-4">
                            <Card className="account-card shadow-sm d-flex flex-column">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title className="mb-3">Account ID: {account.accountId}</Card.Title>
                                        <Card.Text>
                                            <strong>Type:</strong> {account.type}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Amount:</strong> ${account.amount.toFixed(2)}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Username:</strong> {account.user.username}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Email:</strong> {account.user.email}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Phone Number:</strong> {account.user.phoneNumber}
                                        </Card.Text>
                                    </div>
                                    <div className="mt-3">
                                        <Button
                                            variant="primary"
                                            className="w-100 mb-2"
                                            onClick={() => handleView(account.accountId)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            className="w-100 mb-2"
                                            onClick={() => handleEdit(account.accountId)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="w-100"
                                            onClick={() => handleDelete(account.accountId)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>No accounts found</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default AllAccounts;
