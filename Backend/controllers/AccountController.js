const Account = require('../models/account');
const User = require('../models/user');
const Transaction = require('../models/transaction'); 

const generateUniqueAccountNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNumber.toString();
};


exports.createAccount = async (req, res) => {
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


exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find()
            .populate({
                path: 'user', 
                select: 'username email phoneNumber' 
            });

        
        const formattedAccounts = accounts.map(account => ({
            accountId: account._id,
            amount: account.amount,
            type: account.type,
            user: {
                username: account.user.username,
                email: account.user.email,
                phoneNumber: account.user.phoneNumber
            }
        }));

        res.json(formattedAccounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAccountById = async (req, res) => {
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
};// Simulate sending an email notification

exports.
checkAndNotifyZeroBalance = async (req, res) => {
    try {
        const accounts = await Account.find().populate('user');
        
        const zeroBalanceAccounts = accounts.filter(account => account.amount === 0);

        const emailDetails = [];

        if (zeroBalanceAccounts.length > 0) {
            const admin = await User.findOne({ role: 'admin' }).select('email');
            
            if (admin) {
                zeroBalanceAccounts.forEach(account => {
                    emailDetails.push({
                        accountId: account._id,
                        username: account.user.username, 
                        amount: account.amount
                    });
                });
            } else {
                emailDetails.push({ message: 'Admin not found' });
            }
        } else {
            emailDetails.push({ message: 'No New Mail' });
        }

        res.json({ message: `New Mail: ${zeroBalanceAccounts.length} account(s) with zero balance.`, details: emailDetails });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getAllUsersWithAccounts = async (req, res) => {
    try {
        const users = await User.find({ role: 'customer' }).select('-password');
        
        
        const userAccountsPromises = users.map(async (user) => {
            const account = await Account.findOne({ user: user._id });
            
            if (account) {
              
                const transactions = await Transaction.find({
                    $or: [
                        { senderAccountId: account._id },
                        { receiverAccountId: account._id }
                    ]
                }).populate('senderAccountId receiverAccountId loanId investmentId'); 

                return {
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        status: user.status,
                    },
                    account: {
                        accountId: account._id,
                        amount: account.amount,
                        type: account.type,
                        transactions: transactions 
                    }
                };
            } else {
                return {
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        status: user.status,
                    },
                    account: null
                };
            }
        });

       
        const userAccounts = await Promise.all(userAccountsPromises);

        res.json(userAccounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
