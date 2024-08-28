import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
   

    return (
        <>
            <footer className="text-center mt-5 mb-4 bg-dark text-white py-4">
                <div className="container">
                    <p className="mb-2">&copy; 2024 MyFIN Bank. All rights reserved.</p>
                    <div className="mb-3">
                        <a href="/contactus"className="btn btn-outline-light mx-2">Contact Us</a>
                    </div>
                    <div className="social-icons mb-3">
                        <a href="/" className="text-white mx-2"><FaFacebook size={20} /></a>
                        <a href="/" className="text-white mx-2"><FaTwitter size={20} /></a>
                        <a href="/" className="text-white mx-2"><FaLinkedin size={20} /></a>
                        <a href="/" className="text-white mx-2"><FaInstagram size={20} /></a>
                    </div>
                </div>
            </footer>

        </>
    );
}

export default Footer;
