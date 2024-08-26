const Loan = require('../models/loan');
const Account = require('../models/account');

// Apply for a loan
exports.applyForLoan = async (req, res) => {
    const { amount, interestRate, tenure, accountId } = req.body;

    if (!amount || !interestRate || !tenure || !accountId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the account exists
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Check if the account balance is sufficient
        if (account.amount < 5000) {
            return res.status(400).json({ message: 'Insufficient balance to apply for loan' });
        }

        // Create a new loan
        const newLoan = new Loan({
            amount,
            interestRate,
            tenure,
            accountId,
            status: 'Pending'
        });

        await newLoan.save();
        res.status(201).json(newLoan);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateLoanStatus = async (req, res) => {
    const { status } = req.body;
    if (!status || !['Approved', 'Declined'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        // Find the loan by ID
        const loan = await Loan.findById(req.params.id);
        if (!loan) return res.status(404).json({ message: 'Loan not found' });

        // Get the associated account
        const account = await Account.findById(loan.accountId);
        if (!account) return res.status(404).json({ message: 'Account not found' });

        // Check balance before approving loan
        if (status === 'Approved' && account.amount < 5000) { // Set your required minimum balance for approval
            return res.status(400).json({ message: 'Insufficient balance to approve the loan' });
        }

        // Update loan status
        loan.status = status;
        await loan.save();

        res.json(loan);
    } catch (error) {
        console.error('Error updating loan status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.find({});
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loans' });
    }
};