// controllers/fixedDepositController.js
const FixedDeposit = require('../models/fixedDeposit');
const Account = require('../models/account');

// src/controllers/fixedDepositController.js

exports.createFD = async (req, res) => {
    try {
        const { accountId, amount, term, interestRate } = req.body;

        if (!accountId || !amount || !term || !interestRate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const fixedDeposit = new FixedDeposit({
            accountId,
            amount,
            term,
            interestRate
        });

        await fixedDeposit.save();

        res.status(201).json({ message: 'Fixed Deposit created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all Fixed Deposits for an account
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

// Update Fixed Deposit status
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

// Delete a Fixed Deposit
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
