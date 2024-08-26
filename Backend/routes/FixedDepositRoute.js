// routes/fixedDeposits.js
const express = require('express');
const router = express.Router();
const fixedDepositController = require('../controllers/FixedDepositController');
const {protect,admin} = require('../middleware/auth')
// Create a new Fixed Deposit
router.post('/create',protect, fixedDepositController.createFD);

// Get all Fixed Deposits for an account
router.get('/account/:accountId', fixedDepositController.getFDsByAccount);

// Update Fixed Deposit status (e.g., mark as matured)
router.put('/update/:id', fixedDepositController.updateFD);

// Delete a Fixed Deposit
router.delete('/delete/:id', fixedDepositController.deleteFD);

module.exports = router;
