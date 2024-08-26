const express = require('express');
const { 
    registerUser, 
    loginUser, 
    getUserProfile,
    getAllUsers,
    updateUserProfile,
    deactivateUser,
    activateUser 
} = require('../controllers/UserController');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/all', protect, admin, getAllUsers);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/:id/deactivate', protect, admin, deactivateUser);
router.put('/profile/:id/activate', protect, admin, activateUser);

module.exports = router;
