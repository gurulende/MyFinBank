const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        required: true
    },
    accountId: { // Use accountId instead of userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Declined'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Loan', loanSchema);
