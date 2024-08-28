const RecurringDeposit = require('../models/recurringDeposit');
const Account = require('../models/account');
const User = require('../models/user');

exports.createRD = async (req, res) => {
    try {
        const { accountId, monthlyAmount, term } = req.body;

        if (!accountId || !monthlyAmount || !term) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const interestRate = 8;

        // Validate term as an integer
        const termInMonths = parseInt(term, 10);
        if (isNaN(termInMonths) || termInMonths <= 0) {
            return res.status(400).json({ message: 'Term must be a positive integer' });
        }

        const account = await Account.findById(accountId).populate('user');

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the user is active
        const user = account.user;
        if (!user || user.status !== 'active') {
            return res.status(403).json({ message: 'User is not active and cannot create a Recurring Deposit' });
        }

        const totalRequiredAmount = monthlyAmount * termInMonths;

        if (account.amount / 2 < totalRequiredAmount) {
            return res.status(400).json({ message: 'You need at least double the total amount of the RD in your account' });
        }

        // Deduct the required amount for the RD from the account balance
        account.amount -= totalRequiredAmount;
        await account.save();

        // Calculate end date based on term
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + termInMonths);

        const recurringDeposit = new RecurringDeposit({
            accountId,
            monthlyAmount,
            term: termInMonths,
            interestRate,
            endDate
        });

        await recurringDeposit.save();
        res.status(201).json({ message: 'Recurring Deposit created successfully', recurringDeposit });
    } catch (error) {
        console.error('Error creating Recurring Deposit:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getRDsByAccount = async (req, res) => {
    try {
        const { accountId } = req.params;

        const recurringDeposits = await RecurringDeposit.find({ accountId });

        if (recurringDeposits.length === 0) {
            return res.status(404).json({ message: 'No Recurring Deposits found for this account' });
        }

        res.status(200).json(recurringDeposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateRD = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const recurringDeposit = await RecurringDeposit.findByIdAndUpdate(id, { status }, { new: true });

        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring Deposit not found' });
        }

        res.status(200).json({ message: 'Recurring Deposit updated successfully', recurringDeposit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteRD = async (req, res) => {
    try {
        const { id } = req.params;

        const recurringDeposit = await RecurringDeposit.findByIdAndDelete(id);

        if (!recurringDeposit) {
            return res.status(404).json({ message: 'Recurring Deposit not found' });
        }

        res.status(200).json({ message: 'Recurring Deposit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
