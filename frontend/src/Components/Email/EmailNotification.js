import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

const EmailNotification = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckBalance = async () => {
        setLoading(true);
        setResult(null);
        setError('');

        try {
            const token = localStorage.getItem('token'); 
            const { data } = await axios.get('http://localhost:5000/api/accounts/check-zero-balance/email', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (data.details && data.details.length > 0) {
                setResult(
                    <div>
                        <Alert variant="info">{data.message}</Alert>
                        <div className="mt-3">
                            {data.details.map((detail, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>Email Notification</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Subject: Account Balance Alert</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Dear Admin,</strong><br /><br />
                                            The following account has a zero balance:<br /><br />
                                            <strong>Account ID:</strong> {detail.accountId}<br />
                                            <strong>Username:</strong> {detail.username}<br />
                                            <strong>Amount:</strong> ${detail.amount}<br /><br />
                                            Please take necessary action.<br /><br />
                                            Best regards,<br />
                                            Your System
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>
                );
            } else {
                setResult(<Alert variant="info">No zero balance accounts found.</Alert>);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching data.');
            setResult(<Alert variant="danger">An error occurred while fetching data.</Alert>);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <h1 className="text-center">Account Balance Checker</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="text-center mt-3">
                        <Button 
                            variant="primary" 
                            onClick={handleCheckBalance} 
                            disabled={loading}
                        >
                            {loading ? 'Checking...' : 'Check New Mail'}
                        </Button>
                    </div>
                    <div className="mt-4">
                        {result}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default EmailNotification;
