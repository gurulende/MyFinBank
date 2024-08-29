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
        const userId = req.user._id; // Extracted from the `protect` middleware

        // Find the account and ensure it belongs to the logged-in user
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the account belongs to the logged-in user
        if (account.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized to view this account\'s Fixed Deposits' });
        }

        // Fetch Fixed Deposits associated with the account
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
exports.getAllFDsWithDetails = async (req, res) => {
    try {
        // Fetch all Fixed Deposits
        const fixedDeposits = await FixedDeposit.find()
            .populate({
                path: 'accountId',
                populate: {
                    path: 'user',
                    select: 'username', // Select only the username field
                },
            });

        // Check if fixedDeposits is empty
        if (fixedDeposits.length === 0) {
            return res.status(404).json({ message: 'No Fixed Deposits found' });
        }

        // Transform data to include username and accountId
        const fdWithDetails = fixedDeposits.map(fd => {
            if (!fd.accountId) {
                console.log(`Fixed Deposit ${fd._id} has no associated Account`);
                return null;
            }

            const accountId = fd.accountId._id;
            const username = fd.accountId.user ? fd.accountId.user.username : 'Unknown';

            return {
                id: fd._id,
                amount: fd.amount,
                term: fd.term,
                interestRate: fd.interestRate,
                startDate: fd.startDate,
                endDate: fd.endDate,
                accountId,
                username,
            };
        }).filter(fd => fd !== null); // Filter out null entries

        res.status(200).json(fdWithDetails);
    } catch (error) {
        console.error('Error fetching Fixed Deposits with details:', error);
        res.status(500).json({ message: error.message });
    }
};
