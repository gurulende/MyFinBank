import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Profiles from '../Profiles';
import Chat from '../Chat/CustomerChat';
import Logout from '../Pages/Logout';

const PublicRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
);

export default PublicRoutes;
