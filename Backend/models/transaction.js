const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { 
        type: Number, 
        required: true 
    },
    senderAccountId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account' 
    },
    receiverAccountId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Loan',
    },
    investmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment' 
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
