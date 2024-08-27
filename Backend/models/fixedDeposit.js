const mongoose = require('mongoose');

const fixedDepositSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    amount: { type: Number, required: true },
    term: { type: Number, required: true },
    interestRate: { type: Number, required: true }, 
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'matured'], default: 'active' }
});

module.exports = mongoose.model('FixedDeposit', fixedDepositSchema);
