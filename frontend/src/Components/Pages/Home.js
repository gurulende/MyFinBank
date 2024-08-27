import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="hero text-center mb-5">
                <h1 className="display-4 mb-3">Welcome to MyFIN Bank</h1>
                <p className="lead mb-4">Your gateway to seamless banking and account management.</p>
                <img 
                    src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Bank Hero"
                    className="img-fluid rounded shadow-lg"
                    style={{ maxHeight: '900px', objectFit: 'cover' }}
                />
                <div className="mt-4">
                    <a href="/" className="btn btn-primary btn-lg mr-2">View Accounts</a>
                    <a href="/profiles" className="btn btn-secondary btn-lg">Manage Profile</a>
                </div>
            </div>

            <div className="row text-center mb-5">
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3>Secure Transactions</h3>
                        <p>Experience secure and fast transactions with our state-of-the-art security measures.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3>24/7 Support</h3>
                        <p>Our support team is available around the clock to assist you with any queries or issues.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3>Easy Management</h3>
                        <p>Manage your accounts with ease through our user-friendly interface and powerful tools.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
