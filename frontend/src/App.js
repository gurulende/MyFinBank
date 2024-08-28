// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Register from './Components/Pages/Register';
// import Navbar from './Components/Navbar';
// import Login from './Components/Pages/Login';
// import Profiles from './Components/Profiles';
// import Users from './Components/Users';
// import Logout from './Components/Pages/Logout';
// import Home from './Components/Pages/Home';
// import Footer from './Components/Footer';
// import AllAccounts from './Components/Accounts/AllAccount';
// import AccountCreation from './Components/Accounts/AccountCreation';
// import UserDashboard from './Components/Dashboards/UserDashboard';
// import AccountDetails from './Components/Pages/AccountDetails';
// import LoanApplicationForm from './Components/Loans/ApplyLoan';
// import ManageLoans from './Components/Loans/ManageLoans';
// import FixedDepositForm from './Components/Investments/FixedDepositForm';
// import RecurringDepositForm from './Components/Investments/RecurringDepositForm';
// import { AuthProvider, useAuth } from './Components/context/authContext';
// import CalculateEMI from './Components/Loans/CalculateEmi';
// import ViewAccount from './Components/Accounts/ViewAccount';
// import EditAccount from './Components/Accounts/EditAccount';
// import AdminDashboard from './Components/Dashboards/AdminDashboard';
// import Chat from './Components/Chat/CustomerChat';
// import CustomerChat from './Components/Chat/CustomerChat';
// import AdminChat from './Components/Chat/AdminChat';
// import './App.css';

// const ProtectedRoute = ({ element, roles }) => {
//     const { auth } = useAuth();

//     if (!auth.token) {
//         return <Navigate to="/login" />;
//     }

//     if (roles && !roles.includes(auth.role)) {
//         return <Navigate to="/" />;
//     }

//     return element;
// };

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <div className="d-flex flex-column min-vh-100">
//                     <Navbar />
//                     <div className="flex-grow-1">
//                         <Routes>
//                             <Route path="/" element={<Home />} />
//                             <Route path="/register" element={<Register />} />
//                             <Route path="/login" element={<Login />} />
//                             <Route path="/profiles" element={<Profiles />} />
//                             <Route path="/chat" element={<Chat />} />


//                             {/* Protected Routes for Admins */}
//                             <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} roles={['admin']} />} />
//                             <Route path="/users" element={<ProtectedRoute element={<Users />} roles={['admin']} />} />
//                             <Route path="/allaccounts" element={<ProtectedRoute element={<AllAccounts />} roles={['admin']} />} />
//                             <Route path="/manageloans" element={<ProtectedRoute element={<ManageLoans />} roles={['admin']} />} />
//                             <Route path="/accountdetails/:id" element={<ProtectedRoute element={<ViewAccount />} roles={['admin']} />} />
//                             <Route path="/editaccount/:id" element={<ProtectedRoute element={<EditAccount />} roles={['admin']} />} />
                          
//                             <Route path="/adminchat" element={<ProtectedRoute element={<AdminChat />} roles={['admin']} />} />

//                             {/* Protected Routes for Customers */}
//                             <Route path="/user-dashboard" element={<ProtectedRoute element={<UserDashboard />} roles={['customer']} />} />
//                             <Route path="/accountdetails" element={<ProtectedRoute element={<AccountDetails />} roles={['customer']} />} />
//                             <Route path="/applyloan" element={<ProtectedRoute element={<LoanApplicationForm />} roles={['customer']} />} />
//                             <Route path="/fixeddeposit" element={<ProtectedRoute element={<FixedDepositForm />} roles={['customer']} />} />
//                             <Route path="/recurringdeposit" element={<ProtectedRoute element={<RecurringDepositForm />} roles={['customer']} />} />
//                             <Route path="/calculatemi" element={<ProtectedRoute element={<CalculateEMI />} roles={['customer']} />} />
//                             <Route path="/accountcreation" element={<ProtectedRoute element={<AccountCreation />} roles={['customer']} />} />
//                             <Route path="/customerchat" element={<ProtectedRoute element={<CustomerChat />} roles={['customer']} />} />





//                             <Route path="/logout" element={<Logout />} />
//                         </Routes>
//                     </div>
//                     <Footer />
//                 </div>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PublicRoutes from './Components/Routes/PublicRoutes';
import AdminRoutes from './Components/Routes/AdminRoutes';
import CustomerRoutes from './Components/Routes/CustomerRoutes';
import { AuthProvider, useAuth } from './Components/context/authContext';
import './App.css';

const AppContent = () => {
    const { auth } = useAuth(); // Ensure this hook is used inside a component wrapped by AuthProvider

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <div className="flex-grow-1">
                {auth.token ? (
                    auth.role === 'admin' ? <AdminRoutes /> : <CustomerRoutes />
                ) : (
                    <PublicRoutes />
                )}
            </div>
            <Footer />
        </div>
    );
};

const App = () => (
    <AuthProvider>
        <Router>
            <AppContent />
        </Router>
    </AuthProvider>
);

export default App;

