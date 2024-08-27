// controllers/chatController.js
const Chat = require('../models/chat');
const User = require('../models/user');

// Send a chat message
exports.sendMessage = async (req, res) => {
    const { userId } = req.params; // Get receiverId from URL params
    const { message } = req.body;
    const senderId = req.user._id; // Get senderId from authenticated user

    try {
        // Create a new chat message
        const newMessage = new Chat({
            senderId,
            receiverId: userId, // Use the userId from URL params
            message,
            isAdmin: req.user.role === 'admin' // Determine if the sender is an admin
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: 'Error sending message' });
    }
};
// Retrieve chat messages
exports.getChatMessages = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.user;

    try {
        let filter = {};
        if (role === 'admin') {
            // Admin can see all messages for the selected customer
            filter = {
                $or: [
                    { receiverId: userId },
                    { senderId: userId }
                ]
            };
        } else {
            // Customer can see messages related to them
            filter = {
                $or: [
                    { receiverId: userId },
                    { senderId: userId }
                ]
            };
        }

        const messages = await Chat.find(filter)
            .populate('senderId', 'username') // Populate sender's username
            .populate('receiverId', 'username') // Populate receiver's username
            .sort('timestamp');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
};
