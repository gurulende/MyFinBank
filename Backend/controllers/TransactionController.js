const Transaction = require('../models/transaction');
const Account = require('../models/account');

// Create new transaction (used for transfers)
exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
    try {
        // Ensure req.user.id is available
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find the user's account
        const account = await Account.findOne({ user: req.user.id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Find transactions related to the user's account
        const transactions = await Transaction.find({
            $or: [
                { senderAccountId: account._id },
                { receiverAccountId: account._id }
            ]
        }).populate('senderAccountId receiverAccountId loanId investmentId');

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('senderAccountId receiverAccountId loanId investmentId');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// controllers/transactionController.js
// controllers/transactionController.js
exports.deposit = async (req, res) => {
    const { amount } = req.body;
    const { id } = req.params;  // id should be the account ID

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    try {
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Update account balance
        account.amount += amount;
        await account.save();

        // Create a deposit transaction
        const transaction = new Transaction({
            amount,
            receiverAccountId: account._id,
        });
        await transaction.save();

        res.json({ balance: account.amount });
    } catch (error) {
        console.error('Error processing deposit:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.withdraw = async (req, res) => {
    try {
        const { id } = req.params; // id should be the account ID
        const { amount } = req.body;

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.amount < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Update account balance
        account.amount -= amount;
        await account.save();

        // Create transaction record
        const transaction = new Transaction({
            amount,
            senderAccountId: account._id, // Sender is the account being withdrawn from
        });
        await transaction.save();

        res.json({ message: 'Withdrawal successful', balance: account.amount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controllers/transactionController.js
exports.transfer = async (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;

        // Validate amount
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        // Find sender and receiver accounts
        const senderAccount = await Account.findById(senderId);
        if (!senderAccount) {
            return res.status(404).json({ message: 'Sender account not found' });
        }

        const receiverAccount = await Account.findById(receiverId);
        if (!receiverAccount) {
            return res.status(404).json({ message: 'Receiver account not found' });
        }

        // Check for sufficient funds
        if (senderAccount.amount < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Update account balances
        senderAccount.amount -= amount;
        receiverAccount.amount += amount;

        await senderAccount.save();
        await receiverAccount.save();

        // Create transaction record
        const transaction = new Transaction({
            amount,
            senderAccountId: senderAccount._id,
            receiverAccountId: receiverAccount._id,
        });

        await transaction.save();

        // Respond with updated balances
        res.json({ 
            message: 'Transfer successful',
            senderBalance: senderAccount.amount,
            receiverBalance: receiverAccount.amount 
        });
    } catch (error) {
        console.error('Error processing transfer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
