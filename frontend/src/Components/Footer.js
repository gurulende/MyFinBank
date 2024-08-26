import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Footer() {
   
    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <p>&copy; 2024 MyFIN Bank.</p>
            <ul className="list-unstyled">
                <li><a href="/" className="text-white">About Us</a></li>
                <li><a href="/" className="text-white">Contact</a></li>
                <li><a href="/applyloan" className="text-white">Apply Loan</a></li>
                 <Link to={`/accountdetails`} className="text-white">
                            View Details for Account
                        </Link>
              <li><a href="/manageloans" className="text-white">Manage Loans</a></li>

            </ul>
        </footer>
    );
}

export default Footer;
