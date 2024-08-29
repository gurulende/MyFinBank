import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDashboard from '../Dashboards/UserDashboard';
import AccountDetails from '../Accounts/AccountDetails';
import LoanApplicationForm from '../Loans/ApplyLoan';
import FixedDepositForm from '../Investments/FixedDepositForm';
import RecurringDepositForm from '../Investments/RecurringDepositForm';
import CalculateEMI from '../Loans/CalculateEmi';
import AccountCreation from '../Accounts/AccountCreation';
import CustomerChat from '../Chat/CustomerChat';
import ProtectedRoute from './ProtecteRoute';
import Home from '../Pages/Home';
import Profile from '../UsersUpdate/UpdateProfile';
import LoanStatus from '../Loans/LoanStatus';
import UserFD from '../Transactions/UserFD';
import UserRD from '../Transactions/UserRD';

const CustomerRoutes = () => (
    <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/profiles" element={<Profile />} />
        <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} roles={['customer']} />} />
        <Route path="/accountdetails" element={<ProtectedRoute element={<AccountDetails />} roles={['customer']} />} />
        <Route path="/applyloan" element={<ProtectedRoute element={<LoanApplicationForm />} roles={['customer']} />} />
        <Route path="/fixeddeposit" element={<ProtectedRoute element={<FixedDepositForm />} roles={['customer']} />} />
        <Route path="/recurringdeposit" element={<ProtectedRoute element={<RecurringDepositForm />} roles={['customer']} />} />
        <Route path="/calculatemi" element={<ProtectedRoute element={<CalculateEMI />} roles={['customer']} />} />
        <Route path="/accountcreation" element={<ProtectedRoute element={<AccountCreation />} roles={['customer']} />} />
        <Route path="/customerchat" element={<ProtectedRoute element={<CustomerChat />} roles={['customer']} />} />
        <Route path="/loanstatus" element={<ProtectedRoute element={<LoanStatus />} roles={['customer']} />} />
     <Route path="/userfd" element={<ProtectedRoute element={<UserFD />} roles={['customer']} />} />
     <Route path="/userrd" element={<ProtectedRoute element={<UserRD />} roles={['customer']} />} />
    </Routes>
);

export default CustomerRoutes;
