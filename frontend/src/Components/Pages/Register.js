import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 


const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', phoneNumber: '', email: '', role: 'customer' });
    const [error, setError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'phoneNumber') {
            const phonePattern = /^\d{10}$/; 
            if (!phonePattern.test(e.target.value)) {
                setPhoneError('Phone number must be exactly 10 digits');
            } else {
                setPhoneError('');
            }
        }

        if (e.target.name === 'email') {
            const emailPattern = /\S+@\S+\.\S+/;
            if (!emailPattern.test(e.target.value)) {
                setEmailError('Please enter a valid email address');
            } else {
                setEmailError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneError || emailError) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(response.data);
            setError('');
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
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className={`form-control ${emailError ? 'is-invalid' : ''}`} 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange} 
                                placeholder="Enter your email" 
                                required 
                            />
                            <div className="invalid-feedback">{emailError || 'Please provide an email address.'}</div>
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
                                className={`form-control ${phoneError ? 'is-invalid' : ''}`} 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                value={formData.phoneNumber}
                                onChange={handleChange} 
                                placeholder="Enter your phone number" 
                                required 
                            />
                            <div className="invalid-feedback">{phoneError || 'Please provide a phone number.'}</div>
                        </div>
                        <input 
                            type="hidden" 
                            id="role" 
                            name="role" 
                            value={formData.role} 
                        />
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <button type="submit" className="btn btn-outline-success w-100" disabled={phoneError || emailError}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
