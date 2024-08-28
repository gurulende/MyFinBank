// middleware/checkUserStatus.js
const User = require('../models/user');

const checkUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.status !== 'active') {
            return res.status(403).json({ message: 'User is not active and cannot perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = checkUserStatus;
