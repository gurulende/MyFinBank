import React, { useState } from 'react';
import Deposit from '../Transactions/Deposit';
import Withdraw from '../Transactions/Withdrawl';
import TransferMoney from '../Transactions/TransferMoney';
import AccountCreation from '../Accounts/AccountCreation';
import TransactionsList from '../Transactions/Transaction';
import FixedDepositForm from '../Investments/FixedDepositForm';
import RecurringDepositForm from '../Investments/RecurringDepositForm';

const UserDashboard = () => {
    const [currentView, setCurrentView] = useState('deposit');
    const [authToken, setAuthToken] = useState('your-auth-token');
    const [loading, setLoading] = useState(false);

    const handleViewChange = (view) => {
        setLoading(true);
        setTimeout(() => { // Simulate loading delay
            setCurrentView(view);
            setLoading(false);
        }, 500);
    };

    const renderView = () => {
        switch (currentView) {
            case 'deposit':
                return <Deposit authToken={authToken} />;
            case 'withdraw':
                return <Withdraw />;
            case 'transfermoney':
                return <TransferMoney />;
            case 'createAccount':
                return <AccountCreation />;
            case 'transactions':
                return <TransactionsList />;
            case 'fixedDeposit':
                return <FixedDepositForm />;
            case 'recurringDeposit':
                return <RecurringDepositForm />;
            default:
                return <Deposit authToken={authToken} />;
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h4 className="text-center mb-4">Dashboard</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'deposit' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('deposit')}
                                >
                                    Deposit
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'withdraw' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('withdraw')}
                                >
                                    Withdraw
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'transfermoney' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('transfermoney')}
                                >
                                    Transfer Money
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'createAccount' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('createAccount')}
                                >
                                    Create Account
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'transactions' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('transactions')}
                                >
                                    Transactions
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'fixedDeposit' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('fixedDeposit')}
                                >
                                    Fixed Deposit
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'recurringDeposit' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('recurringDeposit')}
                                >
                                    Recurring Deposit
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main role="main" className="col-md-10 ml-sm-auto px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">{currentView.replace(/([A-Z])/g, ' $1').toUpperCase()}</h1>
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        renderView()
                    )}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
