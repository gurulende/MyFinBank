import React from 'react';
import './ContactUs.css'; 
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>If you have any questions or need assistance, feel free to contact us through the following methods:</p>
        
        <div className="contact-card">
          <FaPhoneAlt className="contact-icon" />
          <div className="contact-details">
            <h3>Phone Number:</h3>
            <p>+91 123 456 7890</p>
          </div>
        </div>
        
        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <div className="contact-details">
            <h3>Email Address:</h3>
            <p>admin@MyFin.com</p>
          </div>
        </div>
        
        <div className="contact-card">
          <FaMapMarkerAlt className="contact-icon" />
          <div className="contact-details">
            <h3>Address:</h3>
            <p>
              My Fin Bank Ltd.<br />
              Banking Street,<br />
              Pune, Maharashtra, 411033<br />
              India
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
