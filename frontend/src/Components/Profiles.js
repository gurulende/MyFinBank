import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [user, setUser] = useState({ username: '', role: '', phoneNumber: '' });
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(data);
                setNewUsername(data.username);
                setNewPhoneNumber(data.phoneNumber);
            } catch (error) {
                setError('Failed to load user profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = async () => {
        if (newUsername.trim() === '' || newPhoneNumber.trim() === '') {
            setError('Username and Phone Number are required.');
            return;
        }

        try {
            const { data } = await axios.put('http://localhost:5000/api/users/profile', 
                { username: newUsername, password: newPassword, phoneNumber: newPhoneNumber },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setUser(data);
            setMessage('Profile updated successfully.');
            setError('');
        } catch (error) {
            setError('Failed to update profile.');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Profile</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Current Profile Information</h5>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>

                    <h5 className="mt-4">Update Profile</h5>
                    <div className="mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="New Username" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="New Password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="tel" 
                            className="form-control" 
                            placeholder="New Phone Number" 
                            value={newPhoneNumber} 
                            onChange={(e) => setNewPhoneNumber(e.target.value)} 
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
