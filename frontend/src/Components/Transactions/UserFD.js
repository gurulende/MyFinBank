import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';

const UserFD = () => {
    const [accountId, setAccountId] = useState('');
    const [fixedDeposits, setFixedDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
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
        if (!accountId) {
            return; 
        }

        const fetchFixedDeposits = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                const { data } = await axios.get(`http://localhost:5000/api/fixedDeposit/fds/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFixedDeposits(data);
            } catch (error) {
                
                console.error('Error:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchFixedDeposits();
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
                    <h1 className="text-center mb-4">Your Fixed Deposits</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {fixedDeposits.length === 0 ? (
                        <Alert variant="info">You have no Fixed Deposits.</Alert>
                    ) : (
                        <Row>
                            {fixedDeposits.map((fd) => (
                                <Col md={6} lg={4} key={fd._id} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Fixed Deposit ID: {fd._id}</Card.Title>
                                            <Card.Text>
                                                <strong>Amount:</strong> ${fd.amount.toFixed(2)}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Term:</strong> {fd.term} months
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Interest Rate:</strong> {fd.interestRate}%
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>Start Date:</strong> {new Date(fd.startDate).toLocaleDateString()}
                                            </Card.Text>
                                            <Card.Text>
                                                <strong>End Date:</strong> {new Date(fd.endDate).toLocaleDateString()}
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

export default UserFD;
