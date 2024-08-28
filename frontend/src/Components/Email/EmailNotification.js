import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailNotification = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/accounts/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCustomers(response.data);
      } catch (err) {
        setError('Failed to load customer data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleSendEmail = (accounts) => {
    const hasNonZeroamount = accounts.some(account => account.amount > 0);

    if (hasNonZeroamount) {
      Swal.fire({
        title: "Cannot Send Email",
        text: "The account amount is not zero.",
        icon: "error"
      });
    } else {
      Swal.fire({
        title: "Email Sent Successfully!",
        text: "The email has been sent to the customer.",
        icon: "success"
      });
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do You Want to Logout?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Logout Successful!",
          text: "Redirecting to Home Page",
          icon: "success"
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  if (loading) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-3">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="text-center mt-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );

  return (
    <div className="d-flex flex-column gap-3 w-100 m-auto p-1" style={{ fontFamily: 'Roboto, sans-serif', fontWeight: "500" }}>
      <div className="card-header bg-light shadow-sm d-flex p-2 justify-content-between">
        <div className="fw-bolder fs-5 ms-3">FinBank</div>
        <button className="btn btn-danger btn-sm me-3" onClick={handleLogout}>Logout</button>
      </div>
      <div className="container mt-4">
        <h2>Email Notifications</h2>
        <div className="row">
          {customers.length ? customers.map(customer => (
            <div key={customer.customer.id} className="card mb-3 w-100">
              <div className="card-body">
                <p><strong>Name:</strong> {customer.customer.name}</p>
                <p><strong>Email:</strong> {customer.customer.email}</p>
                {customer.accounts.map(account => (
                  <div key={account._id}>
                    <p><strong>Account Number:</strong> {account.accountNumber}</p>
                    <p><strong>Account Type:</strong> {account.accountType}</p>
                    <p><strong>amount:</strong> ₹{account.amount}</p>
                  </div>
                ))}
                <button 
                  className="btn btn-primary"
                  onClick={() => handleSendEmail(customer.accounts)}
                >
                  Send Email
                </button>
              </div>
            </div>
          )) : (
            <p className="text-center">No customer data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailNotification;
