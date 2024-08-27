const Transaction = require('../models/transaction');
const Account = require('../models/account');

exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const account = await Account.findOne({ user: req.user.id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

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

exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('senderAccountId receiverAccountId loanId investmentId');
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.deposit = async (req, res) => {
    const { amount } = req.body;
    const { id } = req.params;  

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    try {
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

       
        account.amount += amount;
        await account.save();

        
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
        const { id } = req.params; 
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

       
        account.amount -= amount;
        await account.save();

      
        const transaction = new Transaction({
            amount,
            senderAccountId: account._id,
        });
        await transaction.save();

        res.json({ message: 'Withdrawal successful', balance: account.amount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.transfer = async (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;

       
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

       
        const senderAccount = await Account.findById(senderId);
        if (!senderAccount) {
            return res.status(404).json({ message: 'Sender account not found' });
        }

        const receiverAccount = await Account.findById(receiverId);
        if (!receiverAccount) {
            return res.status(404).json({ message: 'Receiver account not found' });
        }

        
        if (senderAccount.amount < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

       
        senderAccount.amount -= amount;
        receiverAccount.amount += amount;

        await senderAccount.save();
        await receiverAccount.save();

        
        const transaction = new Transaction({
            amount,
            senderAccountId: senderAccount._id,
            receiverAccountId: receiverAccount._id,
        });

        await transaction.save();

        
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
