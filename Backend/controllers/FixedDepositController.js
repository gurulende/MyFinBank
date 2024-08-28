const FixedDeposit = require('../models/fixedDeposit');
const Account = require('../models/account');
const User = require('../models/user');

exports.createFD = async (req, res) => {
    try {
        const { accountId, amount, term } = req.body;

        if (!accountId || !amount || !term) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Fixed interest rate
        const interestRate = 7;

        // Find the account and populate the user field to check the user's status
        const account = await Account.findById(accountId).populate('user');

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the user is active
        const user = account.user;
        if (!user || user.status !== 'active') {
            return res.status(403).json({ message: 'User is not active and cannot create a Fixed Deposit' });
        }

        // Check if the account has at least double the FD amount
        if (account.amount < amount * 2) {
            return res.status(400).json({ message: 'Insufficient funds. You need to have at least double the FD amount in your account.' });
        }

        // Calculate the new balance after subtracting the FD amount
        account.amount -= amount;
        await account.save();

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + parseInt(term));

        const fixedDeposit = new FixedDeposit({
            accountId,
            amount,
            term: parseInt(term),
            interestRate,
            startDate,
            endDate
        });

        await fixedDeposit.save();
        res.status(201).json({ message: 'Fixed Deposit created successfully', fixedDeposit });
    } catch (error) {
        console.error('Error creating Fixed Deposit:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




exports.getFDsByAccount = async (req, res) => {
    try {
        const { accountId } = req.params;

        const fixedDeposits = await FixedDeposit.find({ accountId });

        if (fixedDeposits.length === 0) {
            return res.status(404).json({ message: 'No Fixed Deposits found for this account' });
        }

        res.status(200).json(fixedDeposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFD = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const fixedDeposit = await FixedDeposit.findByIdAndUpdate(id, { status }, { new: true });

        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed Deposit not found' });
        }

        res.status(200).json({ message: 'Fixed Deposit updated successfully', fixedDeposit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteFD = async (req, res) => {
    try {
        const { id } = req.params;

        const fixedDeposit = await FixedDeposit.findByIdAndDelete(id);

        if (!fixedDeposit) {
            return res.status(404).json({ message: 'Fixed Deposit not found' });
        }

        res.status(200).json({ message: 'Fixed Deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
