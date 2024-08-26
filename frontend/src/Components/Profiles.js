import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({ username: '', role: '', phoneNumber: '' });
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
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
                setMessage('Failed to load user profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = async () => {
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
        } catch (error) {
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <h3>Update Profile</h3>
            <input 
                type="text" 
                placeholder="New Username" 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
            />
            <input 
                type="tel" 
                placeholder="New Phone Number" 
                value={newPhoneNumber} 
                onChange={(e) => setNewPhoneNumber(e.target.value)} 
            />
            <button onClick={handleUpdate}>Update Profile</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
