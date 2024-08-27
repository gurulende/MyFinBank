import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="text-center mt-5 mb-4 bg-dark text-white py-3">
            <p className="mb-2">&copy; 2024 MyFIN Bank. All rights reserved.</p>
            <a href="/contact" className="btn btn-outline-light">Contact Us</a>
        </footer>
    );
}

export default Footer;
