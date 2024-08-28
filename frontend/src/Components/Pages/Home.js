import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    return (
        <div className="container-fluid px-4">
            {/* Hero Section */}
            <div className="hero position-relative mb-5">
                <img 
                    src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Bank Hero"
                    className="img-fluid rounded"
                />
                <div className="hero-overlay"></div>
                <div className="hero-content text-center text-white py-5 my-5">
                    <h1 className="display-3 mb-4">Welcome to MyFIN Bank</h1>
                    <p className="lead mb-4">Your gateway to seamless banking and account management.</p>
                </div>
            </div>

            {/* Features Section */}
            <div className="row text-center mb-5">
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3 className="h4 mb-3">Secure Transactions</h3>
                        <p>Experience secure and fast transactions with our state-of-the-art security measures.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3 className="h4 mb-3">24/7 Support</h3>
                        <p>Our support team is available around the clock to assist you with any queries or issues.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-card p-4 bg-light rounded shadow-sm">
                        <h3 className="h4 mb-3">Easy Management</h3>
                        <p>Manage your accounts with ease through our user-friendly interface and powerful tools.</p>
                    </div>
                </div>
            </div>

            {/* Financial Products Section */}
            <div className="row text-center mb-5">
                {/* Loan Card */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-lg border-0 rounded">
                        <img
                            src="https://img.freepik.com/free-photo/world-habitat-day-close-up-picture-pile-coins-sag-coin_1150-26741.jpg?t=st=1724847060~exp=1724850660~hmac=c396e2de6feebc300bebebb65b6e6dc3814540f6a3772737f2ef3abcc9617bf4&w=996"
                            alt="Loan"
                            className="card-img-top rounded-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Personal Loans</h5>
                            <p className="card-text">Get loans at a competitive interest rate of 14%. Simplify your financial needs with us.</p>
                            <a href="/loans" className="btn btn-outline-info">Learn More</a>
                        </div>
                    </div>
                </div>

                {/* Fixed Deposit Card */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-lg border-0 rounded">
                        <img
                            src='https://img.freepik.com/free-photo/front-view-commission-still-life-composition_23-2149114625.jpg?t=st=1724846784~exp=1724850384~hmac=f000ed009f1742829ecdbd35e3386cf51f61649dd400f2b0070256c7cd86aa48&w=996'
                            alt="Fixed Deposit"
                            className="card-img-top rounded-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Fixed Deposits</h5>
                            <p className="card-text">Enjoy guaranteed returns with our FD offering 7% interest. Secure your future today.</p>
                            <a href="/fixeddepositterms" className="btn btn-outline-info">Learn More</a>
                        </div>
                    </div>
                </div>

                {/* Recurring Deposit Card */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-lg border-0 rounded">
                        <img
                            src="https://img.freepik.com/free-photo/hand-putting-mix-coins-seed-clear-bottle-copyspace-business-investment-growth-concept_1423-104.jpg?t=st=1724847781~exp=1724851381~hmac=5a0587d35662c9f361bac191c64b10aca718ba7e9c2046a485d9120c534bd150&w=996"
                            alt="Recurring Deposit"
                            className="card-img-top rounded-top"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Recurring Deposits</h5>
                            <p className="card-text">Make regular savings with our RD offering 8% interest. Start your investment journey today.</p>
                            <a href="/recurringdepositterms" className="btn btn-outline-info">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
