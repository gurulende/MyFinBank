// src/Components/DepositWithdraw.js
import React, { useState } from 'react';
import Deposit from './Deposit';
import Withdraw from './Withdrawl';
import TransferMoney from './TransferMoney';
import AccountCreation from './AccountCreation';
import TransactionsList from './TransactionList';
import FixedDepositForm from '../Investments/FixedDepositForm';
import RecurringDepositForm from '../Investments/RecurringDepositForm';

const DepositWithdraw = () => {
    const [currentView, setCurrentView] = useState('deposit'); // 'deposit', 'withdraw', 'transfermoney', 'createAccount', 'transactions', 'fixedDeposit', 'recurringDeposit'
    const [authToken, setAuthToken] = useState('your-auth-token');

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
        <div className="container mt-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <a className="navbar-brand" href="#">Bank App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'deposit' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('deposit')}>Deposit</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'withdraw' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('withdraw')}>Withdraw</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'transfermoney' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('transfermoney')}>Transfer Money</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'createAccount' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('createAccount')}>Create Account</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'transactions' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('transactions')}>Transactions</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'fixedDeposit' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('fixedDeposit')}>Fixed Deposit</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link btn ${currentView === 'recurringDeposit' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentView('recurringDeposit')}>Recurring Deposit</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div>
                {renderView()}
            </div>
        </div>
    );
};

export default DepositWithdraw;
