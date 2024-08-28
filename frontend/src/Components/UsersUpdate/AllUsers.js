import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Log the raw response data to debug
            console.log('Fetched users:', response.data);

            // Filter only customers and use their current status
            const customers = response.data.filter(user => user.role === 'customer');
            setUsers(customers);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleActivate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${id}/activate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Log to confirm activation request
            console.log(`User ${id} activated`);
            
            // Refetch users after activation
            fetchUsers();
        } catch (err) {
            setError('Failed to activate user');
            console.error('Error activating user', err);
        }
    };

    const handleDeactivate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${id}/deactivate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Log to confirm deactivation request
            console.log(`User ${id} deactivated`);
            
            // Refetch users after deactivation
            fetchUsers();
        } catch (err) {
            setError('Failed to deactivate user');
            console.error('Error deactivating user', err);
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <h2 className="mb-4">Customers List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="4">No customers found.</td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>{user.status === 'active' ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {user.status === 'active' ? (
                                        <button 
                                            onClick={() => handleDeactivate(user._id)} 
                                            className="btn btn-outline-warning"
                                        >
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleActivate(user._id)} 
                                            className="btn btn-outline-success"
                                        >
                                            Activate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
