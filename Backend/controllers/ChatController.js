const Chat = require('../models/chat');

// Get all chat messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Chat.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Post a new chat message
exports.postMessage = async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }
    
    try {
        const newMessage = new Chat({ message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
