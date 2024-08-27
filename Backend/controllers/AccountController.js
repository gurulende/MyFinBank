const Account = require('../models/account');

const generateUniqueAccountNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNumber.toString();
};

exports.createAccount = async (req, res) => {///to create a account
    try {
        const { amount, type } = req.body; 

        if (amount === undefined) {
            return res.status(400).json({ message: 'Amount is required' });
        }
        const existingAccount = await Account.findOne({ user: req.user.id });
        if (existingAccount) {
            return res.status(400).json({ message: 'User already has an account' });
        }

      
        const account = new Account({
            accountNumber: generateUniqueAccountNumber(),
            amount,
            user: req.user.id,
            type: type || 'Savings',
        });

        await account.save();
        res.status(201).json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllAccounts = async (req, res) => {//to get all accounts
    try {
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAccountById = async (req, res) => {//to get account by id
    try {
        const account = await Account.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAccount = async (req, res) => {//to update account
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json(account);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteAccount = async (req, res) => {//to delete account
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json({ message: 'Account deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





// Get Account for Logged-in User
// controllers/accountController.js// Get Account for Logged-in User
exports.getMyAccount = async (req, res) => {
    try {
        // Ensure req.user.id is available
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Fetch the account for the logged-in user
        const account = await Account.findOne({ user: req.user.id });
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.json(account);
    } catch (error) {
        console.error('Error fetching account for logged-in user:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
};
