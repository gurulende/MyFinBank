import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Ensure you create this CSS file for additional styling

function Footer() {
    return (
        <footer className="text-center mt-5 mb-4 bg-dark text-white py-4">
            <div className="container">
                <p className="mb-2">&copy; 2024 MyFIN Bank. All rights reserved.</p>
                <div className="mb-3">
                    <a href="/contact" className="btn btn-outline-light mx-2">Contact Us</a>
                    <a href="/" className="btn btn-outline-light mx-2">Privacy Policy</a>
                    <a href="/" className="btn btn-outline-light mx-2">Terms of Service</a>
                </div>
                <div className="social-icons mb-3">
                    <a href="/" className="text-white mx-2"><FaFacebook size={20} /></a>
                    <a href="/" className="text-white mx-2"><FaTwitter size={20} /></a>
                    <a href="/" className="text-white mx-2"><FaLinkedin size={20} /></a>
                    <a href="/" className="text-white mx-2"><FaInstagram size={20} /></a>
                </div>
                <a href="#top" className="btn btn-light btn-sm">Back to Top</a>
            </div>
        </footer>
    );
}

export default Footer;
