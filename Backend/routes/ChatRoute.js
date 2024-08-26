const express = require('express');
const { getMessages, postMessage } = require('../controllers/chatcontroller');
const router = express.Router();

router.get('/', getMessages);
router.post('/', postMessage);

module.exports = router;
