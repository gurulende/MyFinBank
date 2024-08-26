const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { protect, admin } = require('../middleware/auth');

router.post('/', admin, transactionController.createTransaction);
router.get('/', protect, transactionController.getTransactions);
router.get('/:id', admin, transactionController.getTransactionById);

router.post('/:id/deposit', protect, transactionController.deposit);
router.post('/:id/withdraw', protect, transactionController.withdraw);

router.post('/transfer', protect, transactionController.transfer);


module.exports = router;
