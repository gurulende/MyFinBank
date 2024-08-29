const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/TransactionController');
const { protect, admin } = require('../middleware/auth');
const checkUserStatus = require('../middleware/checkUserStatus');

router.post('/', admin, transactionController.createTransaction);
router.get('/', protect, transactionController.getTransactions);
router.get('/:id', admin, transactionController.getTransactionById);

router.post('/:id/deposit', protect, checkUserStatus, transactionController.deposit);
router.post('/:id/withdraw', protect, checkUserStatus, transactionController.withdraw);

router.post('/transfer', protect, checkUserStatus, transactionController.transfer);

router.get('/user/:userId',protect, transactionController.getUserTransactions);


module.exports = router;
