const express = require('express');
const router = express.Router();
const loanController = require('../controllers/LoanController');
const { protect, admin } = require('../middleware/auth');

// Apply for a loan
router.post('/apply', protect, loanController.applyForLoan);

// Admin-only route to update loan status
router.put('/update/:id', protect, admin, loanController.updateLoanStatus);

// Get all loans
router.get('/all', protect,admin, loanController.getAllLoans);

router.post('/emi', protect, loanController.calculateEMI);

module.exports = router;
