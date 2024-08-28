const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, accountController.createAccount);
router.get('/getdetails/me', protect, accountController.getMyAccount); // Get logged-in user's account

router.get('/all/acc', protect, admin, accountController.getAllAccounts); // Admin route to get all accounts
router.get('/:id', protect, admin, accountController.getAccountById); // Admin route to get account by ID
router.patch('/:id', protect, admin, accountController.updateAccount); // Admin route to update account
router.delete('/:id', protect, admin, accountController.deleteAccount); // Admin route to delete account

router.get('/check-zero-balance/email', protect, admin, accountController.checkAndNotifyZeroBalance);

router.get('/getallusersaccount/users', protect, admin, accountController.getAllUsersWithAccounts);




module.exports = router;
