import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaPhone } from 'react-icons/fa'; 
import './UpdateProfile.css';


const Profile = () => {
    const [user, setUser] = useState({ username: '', role: '', phoneNumber: '', email: '' });
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newEmail, setNewEmail] = useState('');
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
                setNewEmail(data.email);
            } catch (error) {
                setError('Failed to load user profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = async () => {
        if (newUsername.trim() === '' || newPhoneNumber.trim() === '' || newEmail.trim() === '') {
            setError('Username, Email, and Phone Number are required.');
            return;
        }

        try {
            const { data } = await axios.put('http://localhost:5000/api/users/profile', 
                { username: newUsername, password: newPassword, phoneNumber: newPhoneNumber, email: newEmail },
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
            <h2 className="mb-4 text-center">User Profile</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-4">Current Profile Information</h5>
                    <div className="d-flex align-items-center mb-3">
                        <FaUser size={24} className="me-2" />
                        <p><strong>Username:</strong> {user.username}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <FaPhone size={24} className="me-2" />
                        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    <h5 className="mt-4 mb-3">Update Profile</h5>
                    <div className="mb-3">
                        <label className="form-label">New Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="New Username" 
                            value={newUsername} 
                            onChange={(e) => setNewUsername(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="New Password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Phone Number</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            placeholder="New Phone Number" 
                            value={newPhoneNumber} 
                            onChange={(e) => setNewPhoneNumber(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="New Email" 
                            value={newEmail} 
                            onChange={(e) => setNewEmail(e.target.value)} 
                        />
                    </div>
                    <button className="btn btn-primary custom-btn" onClick={handleUpdate}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
