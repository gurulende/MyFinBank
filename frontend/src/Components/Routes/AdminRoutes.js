import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Dashboards/AdminDashboard';
import AllAccounts from '../Accounts/AllAccount';
import ManageLoans from '../Loans/ManageLoans';
import ViewAccount from '../Accounts/ViewAccount';
import EditAccount from '../Accounts/EditAccount';
import AdminChat from '../Chat/AdminChat';
import ProtectedRoute from './ProtecteRoute';
import Home from '../Pages/Home';
import EmailNotification from '../Email/EmailNotification';
import UserAccountsList from '../Accounts/UserAccountsList';
import UserTransacion from '../Accounts/UsersTransaction';

const AdminRoutes = () => (
    <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
        <Route path="/allaccounts" element={<ProtectedRoute element={<AllAccounts />} roles={['admin']} />} />
        <Route path="/manageloans" element={<ProtectedRoute element={<ManageLoans />} roles={['admin']} />} />
        <Route path="/accountdetails/:id" element={<ProtectedRoute element={<ViewAccount />} roles={['admin']} />} />
        <Route path="/editaccount/:id" element={<ProtectedRoute element={<EditAccount />} roles={['admin']} />} />
        <Route path="/adminchat" element={<ProtectedRoute element={<AdminChat />} roles={['admin']} />} />
        <Route path="/emailnotification" element={<ProtectedRoute element={<EmailNotification />} roles={['admin']} />} />
     <Route path="/ UserAccountsList" element={<ProtectedRoute element={< UserAccountsList />} roles={['admin']} />} />
      <Route path="/usertransaction" element={<ProtectedRoute element={< UserTransacion />} roles={['admin']} />} />
      </Routes>
   
);

export default AdminRoutes;
