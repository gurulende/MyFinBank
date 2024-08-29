import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const UserRD = () => {
    const [recurringDeposits, setRecurringDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [accountId, setAccountId] = useState('');


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

                if (response.data) {
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

        const fetchRecurringDeposits = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                const { data } = await axios.get(`http://localhost:5000/api/recurringDeposit/rds/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setRecurringDeposits(data);
            } catch (error) {
                setError('An error occurred while fetching Recurring Deposits.');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecurringDeposits();
    }, [accountId]);

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
                    <h1 className="text-center mb-4">Your Recurring Deposits</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {recurringDeposits.length === 0 ? (
                        <Alert variant="info">You have no Recurring Deposits.</Alert>
                    ) : (
                        <Row>
                            {recurringDeposits.map((rd) => (
                                <Col md={6} lg={4} key={rd._id} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Recurring Deposit ID: {rd._id}</Card.Title>
                                            <Card.Text>
                                                <strong>Monthly Amount:</strong> ${rd.monthlyAmount.toFixed(2)}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Term:</strong> {rd.term} months
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Interest Rate:</strong> {rd.interestRate}%
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>End Date:</strong> {new Date(rd.endDate).toLocaleDateString()}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserRD;
