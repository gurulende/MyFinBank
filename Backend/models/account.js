const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { 
                type: String, 
                required: true, 
                unique: true,
                maxLength: 10,
            },
    amount: { 
                type: Number, 
                default: 0 
            },
    type: { 
                type: String, 
                enum: ['Savings', 'Current'] 
            },
    user: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User',
                unique: true, 
            },
    transactions: [
                { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Transaction' 
                }
                ]
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
