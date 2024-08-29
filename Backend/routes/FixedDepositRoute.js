// routes/fixedDeposits.js
const express = require('express');
const router = express.Router();
const fixedDepositController = require('../controllers/FixedDepositController');
const {protect,admin} = require('../middleware/auth')
const checkUserStatus = require('../middleware/checkUserStatus');

// Create a new Fixed Deposit
router.post('/create',protect,checkUserStatus, fixedDepositController.createFD);

// Get all Fixed Deposits for an account
router.get('/fds/:accountId',protect, fixedDepositController.getFDsByAccount);

// Update Fixed Deposit status (e.g., mark as matured)
router.put('/update/:id', fixedDepositController.updateFD);

// Delete a Fixed Deposit
router.delete('/delete/:id', fixedDepositController.deleteFD);

module.exports = router;
