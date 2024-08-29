import React, { useState } from 'react';
import AllAccounts from '../Accounts/AllAccount';
import ManageLoans from '../Loans/ManageLoans';
import ViewAccount from '../Accounts/ViewAccount';
import EditAccount from '../Accounts/EditAccount';
import UserAccountsList from '../Accounts/UserAccountsList'; // Import the UserAccountsList component

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState('userAccountsList'); // Default to 'userAccountsList'
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
            case 'allaccounts':
                return <AllAccounts />;
            case 'manageloans':
                return <ManageLoans />;
            case 'viewAccount':
                return <ViewAccount />;
            case 'editAccount':
                return <EditAccount />;
            case 'userAccountsList': // Ensure this matches the view name
                return <UserAccountsList />;
            default:
                return <UserAccountsList />;
        }
    };

    const formatTitle = (view) => {
        return view
            .replace(/([A-Z])/g, ' $1') // Add space before uppercase letters
            .toUpperCase(); // Convert to uppercase
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h4 className="text-center mb-4">Admin Dashboard</h4>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'userAccountsList' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('userAccountsList')}
                                >
                                    Manage Users
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'allaccounts' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('allaccounts')}
                                >
                                    All Accounts
                                </button>
                            </li>
                            <li className="nav-item">
                                <button 
                                    className={`nav-link ${currentView === 'manageloans' ? 'active' : ''}`} 
                                    onClick={() => handleViewChange('manageloans')}
                                >
                                    Manage Loans
                                </button>
                            </li>
                          
                        </ul>
                    </div>
                </nav>
                <main role="main" className="col-md-10 ml-sm-auto px-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">{formatTitle(currentView)}</h1>
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
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

export default AdminDashboard;
