const Loan = require('../models/loan');
const Account = require('../models/account');

exports.applyForLoan = async (req, res) => {
    const { amount, interestRate, tenure, accountId } = req.body;

    if (!amount || !interestRate || !tenure || !accountId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.amount < 5000) {
            return res.status(400).json({ message: 'Insufficient balance to apply for loan' });
        }

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
       
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

       
        const account = await Account.findById(loan.accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

      
        if (status === 'Approved') {
            if (account.amount/2 < loan.amount) {
                return res.status(400).json({ message: 'Insufficient balance to approve the loan' });
            }

           
            account.amount += loan.amount;
            await account.save();
        }

        
        loan.status = status;
        await loan.save();

        res.json({ message: `Loan has been ${status.toLowerCase()}`, loan, account });
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

exports.calculateEMI = (req, res) => {
    const { amount, interestRate, tenure } = req.body;

    if (!amount || !interestRate || !tenure) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const principal = parseFloat(amount);
        const annualInterestRate = parseFloat(interestRate) / 100;
        const months = parseInt(tenure, 10);

        const monthlyInterestRate = annualInterestRate / 12;
        const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) / (Math.pow(1 + monthlyInterestRate, months) - 1);

        res.json({ emi });
    } catch (error) {
        console.error('Error calculating EMI:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
