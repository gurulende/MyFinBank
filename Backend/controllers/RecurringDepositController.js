const RecurringDeposit = require('../models/recurringDeposit');
const Account = require('../models/account');

exports.createRD = async (req, res) => {
    try {
        const { accountId, monthlyAmount, term, interestRate } = req.body;

        if (!accountId || !monthlyAmount || !term || !interestRate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + parseInt(term));

        const recurringDeposit = new RecurringDeposit({
            accountId,
            monthlyAmount,
            term,
            interestRate,
            endDate
        });

        await recurringDeposit.save();
        res.status(201).json({ message: 'Recurring Deposit created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
