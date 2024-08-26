import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Set all users to active by default
                const activeUsers = response.data.map(user => ({ ...user, active: true }));

                setUsers(activeUsers);
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users', err);
            }
        };

        fetchUsers();
    }, [token]);

    const handleActivate = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/users/profile/${id}/activate`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, active: true } : user));
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
            setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, active: false } : user));
        } catch (err) {
            setError('Failed to deactivate user');
            console.error('Error deactivating user', err);
        }
    };
    
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Users List</h2>
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
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                {user.active ? (
                                    <button 
                                        onClick={() => handleDeactivate(user._id)} 
                                        className="btn btn-warning"
                                    >
                                        Deactivate
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => handleActivate(user._id)} 
                                        className="btn btn-success"
                                    >
                                        Activate
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
