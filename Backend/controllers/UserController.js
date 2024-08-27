const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });


};



exports.registerUser = async (req, res) => {
    const { username, password, role, phoneNumber } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ username, password, role, phoneNumber });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user._id, user.role);

        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            phoneNumber: user.phoneNumber,
            token: token,
        });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { id } = req.user;
    const { username, password, phoneNumber } = req.body;

    try {
        const user = await User.findById(id);
        if (user) {
            user.username = username || user.username;
            user.phoneNumber = phoneNumber || user.phoneNumber;
            if (password) {
                user.password = await bcrypt.hash(password, 10); 
            }
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role,
                status: updatedUser.status,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                phoneNumber: user.phoneNumber,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};





exports.deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const userToDelete = await User.findById(req.params.id);

        if (userToDelete) {
            if (userToDelete._id.equals(id) || req.user.role === 'admin') {
                await userToDelete.remove();
                res.json({ message: 'User deleted' });
            } else {
                res.status(403).json({ message: 'Not authorized to delete this user' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



exports.deactivateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user && user.role === 'customer') {
            user.status = 'inactive';
            await user.save();
            res.json({ message: 'User deactivated' });
        } else {
            res.status(404).json({ message: 'User not found or not a customer' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.activateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user && user.role === 'customer') {
            user.status = 'active';
            await user.save();
            res.json({ message: 'User activated' });
        } else {
            res.status(404).json({ message: 'User not found or not a customer' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
