import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Pages/Register';
import Navbar from './Components/Navbar';
import Login from './Components/Pages/Login';
import Profiles from './Components/Profiles';
import Users from './Components/Users';
import Logout from './Components/Pages/Logout';
import Home from './Components/Pages/Home';
import Footer from './Components/Footer';
import Account from './Components/Accounts';
import AccountCreation from './Components/Transactions/AccountCreation';
import DepositWithdraw from './Components/Transactions/DepositWithdraw';
import AccountDetails from './Components/Pages/AccountDetails';
import LoanApplicationForm from './Components/Loans/ApplyLoan';
import ManageLoans from './Components/Loans/ManageLoans';
import FixedDepositForm from './Components/Investments/FixedDepositForm';
import RecurringDepositForm from './Components/Investments/RecurringDepositForm';
import { AuthProvider } from './Components/context/authContext';



function App() {
    return (
        <AuthProvider>
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profiles" element={<Profiles />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/accountcreation" element={<AccountCreation />} />
                        <Route path="/depositwithdraw" element={<DepositWithdraw />} />
                        <Route path="/accountdetails" element={<AccountDetails />} />
                        <Route path="/manageloans" element={<ManageLoans />} />
                        <Route path="/applyloan" element={<LoanApplicationForm />} />
                        <Route path="/fixeddeposit" element={<FixedDepositForm />} />
                        <Route path="/recurringdeposit" element={<RecurringDepositForm />} />




                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
        </AuthProvider>
    );
}

export default App;
