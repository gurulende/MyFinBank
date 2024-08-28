import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Chat from '../Chat/CustomerChat';
import Logout from '../Pages/Logout';
import FixedDepositTerms from '../Investments/FixedDepositTerms';
import RecurringDepositTerms from '../Investments/RecurringDepositTerms';
import ContactUs from '../Pages/ContactUs';

const PublicRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/fixeddepositterms" element={<FixedDepositTerms />} />
        <Route path="/recurringdepositterms" element={<RecurringDepositTerms />} />
        <Route path="/contactus" element={<ContactUs/>} />




    </Routes>
);

export default PublicRoutes;
