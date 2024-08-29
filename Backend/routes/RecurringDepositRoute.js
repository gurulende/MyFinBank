// routes/recurringDeposits.js
const express = require('express');
const router = express.Router();
const RecurringDepositController = require('../controllers/RecurringDepositController');
const { protect,admin } = require('../middleware/auth');
const checkUserStatus = require('../middleware/checkUserStatus');



// Create a new Recurring Deposit
router.post('/create',protect,checkUserStatus, RecurringDepositController.createRD);

// Get all Recurring Deposits for an account
router.get('/rds/:accountId', protect,RecurringDepositController.getRDsByAccount);

// Update Recurring Deposit status (e.g., mark as matured)
router.put('/update/:id', RecurringDepositController.updateRD);

// Delete a Recurring Deposit
router.delete('/delete/:id', RecurringDepositController.deleteRD);

router.get('/recurring-deposits/all', protect, admin,  RecurringDepositController.getAllRDsWithDetails);


module.exports = router;
