const FixedDeposit = require('../models/fixedDeposit');
const Account = require('../models/account');


exports.createFD = async (req, res) => {
    try {
        const { accountId, amount, term, interestRate } = req.body;

        if (!accountId || !amount || !term || !interestRate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the account to ensure it exists and retrieve its current balance
        const account = await Account.findById(accountId);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the account has at least double the FD amount
        if (account.amount < amount * 2) {
            return res.status(400).json({ message: 'Insufficient funds. You need to have at least double the FD amount in your account.' });
        }

        // Calculate the new balance after subtracting the FD amount
        account.amount -= amount; // Ensure 'amount' is the correct field name
        await account.save();

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + term); 

        const fixedDeposit = new FixedDeposit({
            accountId,
            amount,
            term,
            interestRate,
            startDate,
            endDate
        });

        await fixedDeposit.save();
        res.status(201).json({ message: 'Fixed Deposit created successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: error.message });
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
