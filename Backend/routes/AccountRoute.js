const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const { protect } = require('../middleware/auth'); // Ensure protect middleware is imported

router.post('/', protect, accountController.createAccount);
router.get('/', protect, accountController.getAllAccounts); 
router.get('/:id', protect, accountController.getAccountById); // Admin route to get account by ID
router.get('/getdetails/me', protect, accountController.getMyAccount); // Route to get account details for logged-in user
router.patch('/:id', protect, accountController.updateAccount); // Admin route to update account
router.delete('/:id', protect, accountController.deleteAccount); // Admin route to delete account
// routes/accountRoutes.js


module.exports = router;
