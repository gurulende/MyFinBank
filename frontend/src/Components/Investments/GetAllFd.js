// src/components/AllFDs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adjust the import path if necessary

function AllFDs() {
    const [fixedDeposits, setFixedDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFixedDeposits = async () => {
            try {
                // Retrieve token from local storage or context
                const token = localStorage.getItem('token'); // Adjust as necessary

                const response = await axios.get('http://localhost:5000/api/fixedDeposit/fixed-deposits/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFixedDeposits(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFixedDeposits();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h2>Fixed Deposits</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Term (Months)</th>
                        <th>Interest Rate (%)</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Account ID</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {fixedDeposits.map(fd => (
                        <tr key={fd.id}>
                            <td>{fd.id}</td>
                            <td>{fd.amount}</td>
                            <td>{fd.term}</td>
                            <td>{fd.interestRate}</td>
                            <td>{new Date(fd.startDate).toLocaleDateString()}</td>
                            <td>{new Date(fd.endDate).toLocaleDateString()}</td>
                            <td>{fd.accountId}</td>
                            <td>{fd.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllFDs;
