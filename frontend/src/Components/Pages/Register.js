import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', phoneNumber: '', role: 'customer' }); // Default role set to 'customer'
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(response.data);
            setError(''); // Clear any previous errors
            alert('User registered successfully!');
        } catch (error) {
            console.error('Error registering user', error);
            setError(error.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4 text-center">Register</h2>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                placeholder="Enter your username" 
                                required 
                            />
                            <div className="invalid-feedback">Please provide a username.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password" 
                                value={formData.password}
                                onChange={handleChange} 
                                placeholder="Enter your password" 
                                required 
                            />
                            <div className="invalid-feedback">Please provide a password.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                value={formData.phoneNumber}
                                onChange={handleChange} 
                                placeholder="Enter your phone number" 
                                required 
                            />
                            <div className="invalid-feedback">Please provide a phone number.</div>
                        </div>
                        {/* Role selection dropdown (hidden to the user) */}
                        <input 
                            type="hidden" 
                            id="role" 
                            name="role" 
                            value={formData.role} 
                        />
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
