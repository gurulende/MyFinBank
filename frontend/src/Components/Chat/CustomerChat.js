import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './CustomerChat.css'; // Ensure you create this CSS file

const CustomerChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [adminId, setAdminId] = useState('');
    const [userId, setUserId] = useState('');
    
    const token = localStorage.getItem('token');
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserId(response.data._id);
            } catch (err) {
                console.error('Error fetching user ID', err);
                setError('Failed to fetch user ID');
            }
        };

        const fetchAdminId = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/admin', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAdminId(response.data._id);
            } catch (err) {
                console.error('Error fetching admin ID', err);
                setError('Failed to fetch admin ID');
            }
        };

        fetchUserId();
        fetchAdminId();
    }, [token]);

    useEffect(() => {
        if (!userId) return;

        const fetchMessages = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`http://localhost:5000/api/chat/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(data);
                setError('');
            } catch (err) {
                console.error('Error fetching messages', err);
                setError('Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [userId, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !adminId || !userId) {
            console.error('Message is empty or Admin/User ID is not available');
            setError('Message is empty or Admin/User ID is not available');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/chat/send/${userId}`, {
                receiverId: adminId,
                message: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewMessage('');

            const { data } = await axios.get(`http://localhost:5000/api/chat/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(data);
        } catch (err) {
            console.error('Error sending message:', err.response ? err.response.data : err.message);
            setError('Failed to send message');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            <h2 className="chat-header">Customer Chat</h2>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="message-container">
                {messages.map(msg => (
                    <div key={msg._id} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                        <div className="message-content">
                            <strong>{msg.senderId.username}:</strong> {msg.message}
                        </div>
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default CustomerChat;
