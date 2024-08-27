import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditAccount = () => {
    const { id } = useParams();
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/accounts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setType(response.data.type);
                setAmount(response.data.amount);
            } catch (err) {
                setError('Failed to fetch account details');
            }
        };
        fetchAccount();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/api/accounts/${id}`, { type, amount }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/accounts');
        } catch (err) {
            setError('Failed to update account');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Account</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Account Type</label>
                    <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default EditAccount;
