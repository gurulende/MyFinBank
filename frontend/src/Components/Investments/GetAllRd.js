import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Adjust the import path if necessary

function AllRDs() {
    const [recurringDeposits, setRecurringDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecurringDeposits = async () => {
            try {
                const token = localStorage.getItem('token'); // Adjust as necessary

                const response = await axios.get('http://localhost:5000/api/recurringDeposit/recurring-deposits/all', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming the API returns an array of recurring deposits with populated account details
                setRecurringDeposits(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRecurringDeposits();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h2>Recurring Deposits</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Monthly Amount</th>
                        <th>Term (Months)</th>
                        <th>Interest Rate (%)</th>
                        <th>End Date</th>
                        <th>Account ID</th>
                        <th>Username</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {recurringDeposits.map(rd => (
                        <tr key={rd._id}>
                            <td>{rd._id}</td>
                            <td>{rd.monthlyAmount}</td>
                            <td>{rd.term}</td>
                            <td>{rd.interestRate}</td>
                            <td>{new Date(rd.endDate).toLocaleDateString()}</td>
                            <td>{rd.accountId}</td>
                            <td>{rd.username || 'Unknown'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllRDs;
