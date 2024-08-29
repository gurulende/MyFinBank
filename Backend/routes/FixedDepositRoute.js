// routes/fixedDeposits.js
const express = require('express');
const router = express.Router();
const fixedDepositController = require('../controllers/FixedDepositController');
const {protect,admin} = require('../middleware/auth')
const checkUserStatus = require('../middleware/checkUserStatus');

// Create a new Fixed Deposit
router.post('/create',protect,checkUserStatus, fixedDepositController.createFD);

router.get('/fds/:accountId',protect, fixedDepositController.getFDsByAccount);

router.put('/update/:id', fixedDepositController.updateFD);

router.delete('/delete/:id', fixedDepositController.deleteFD);

router.get('/fixed-deposits/all', protect,admin, fixedDepositController.getAllFDsWithDetails);



module.exports = router;
