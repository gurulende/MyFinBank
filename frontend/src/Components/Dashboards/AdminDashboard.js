import React, { useState } from 'react';
import AllAccounts from '../Accounts/AllAccount';
import ManageLoans from '../Loans/ManageLoans';
import ViewAccount from '../Accounts/ViewAccount';
import EditAccount from '../Accounts/EditAccount';
import UserAccountsList from '../Accounts/UserAccountsList'; 
import AllFDs from '../Investments/GetAllFd'; // Import AllFDs component
import AllRDs from '../Investments/GetAllRd'; // Import AllRDs component

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState('userAccountsList'); 
    const [loading, setLoading] = useState(false);

    const handleViewChange = (view) => {
        setLoading(true);
        setTimeout(() => { 
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
            case 'userAccountsList':
                return <UserAccountsList />;
            case 'allfds':
                return <AllFDs />; // Render AllFDs component
            case 'allrds':
                return <AllRDs />; // Render AllRDs component
            default:
                return <UserAccountsList />;
        }
    };

    const formatTitle = (view) => {
        switch (view) {
            case 'allfds':
                return 'ALL FIXED DEPOSITS';
            case 'allrds':
                return 'ALL RECURRING DEPOSITS';
            default:
                return view
                    .replace(/([A-Z])/g, ' $1') 
                    .toUpperCase(); 
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h4 className="text-center mb-4">Admin Dashboard</h4>
                        <ul className="nav flex-column">
                            {['userAccountsList', 'allaccounts', 'manageloans', 'allfds', 'allrds'].map(view => (
                                <li className="nav-item" key={view}>
                                    <button 
                                        className={`nav-link ${currentView === view ? 'active' : ''}`} 
                                        onClick={() => handleViewChange(view)}
                                    >
                                        {view === 'allfds' ? 'All Fixed Deposits' :
                                         view === 'allrds' ? 'All Recurring Deposits' :
                                         view.charAt(0).toUpperCase() + view.slice(1).replace(/([A-Z])/g, ' ')}
                                    </button>
                                </li>
                            ))}
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
