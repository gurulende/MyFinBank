import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AdminChat.css'; 

const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const endOfMessagesRef = useRef(null);
    
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/users/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCustomers(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    useEffect(() => {
        if (selectedCustomer) {
            const fetchMessages = async () => {
                setLoading(true);
                try {
                    const { data } = await axios.get(`http://localhost:5000/api/chat/${selectedCustomer}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMessages(data);
                    setError('');
                } catch (err) {
                    setError('Failed to fetch messages');
                    console.error('Error fetching messages', err);
                } finally {
                    setLoading(false);
                }
            };

            fetchMessages();
        }
    }, [selectedCustomer, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedCustomer) return;

        try {
            await axios.post(`http://localhost:5000/api/chat/send/${selectedCustomer}`, {
                message: newMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewMessage('');

            // Fetch updated messages after sending
            const { data } = await axios.get(`http://localhost:5000/api/chat/${selectedCustomer}`, {
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
        <div className="admin-chat-container">
            <h2>Admin Chat</h2>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="customer-select">
                <select onChange={e => setSelectedCustomer(e.target.value)} value={selectedCustomer}>
                    <option value="">Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer._id} value={customer._id}>{customer.username}</option>
                    ))}
                </select>
            </div>
            <div className="message-container">
                {messages.map(msg => (
                    <div key={msg._id} className={`message ${msg.senderId._id === selectedCustomer ? 'received' : 'sent'}`}>
                        <strong>{msg.senderId.username}:</strong> {msg.message}
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

export default AdminChat;
