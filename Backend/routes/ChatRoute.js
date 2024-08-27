const express = require('express');
const { sendMessage, getChatMessages } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Endpoint for sending a message
router.post('/send/:userId', protect, sendMessage);

// Endpoint for retrieving chat messages
router.get('/:userId', protect, getChatMessages);

module.exports = router;
