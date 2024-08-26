const express = require('express');
const mongoose = require('mongoose');
const accountRoutes = require('./routes/AccountRoute');
const loanRoutes = require('./routes/LoanRoute');
const transactionRoutes = require('./routes/TransactionRoute');
const chatRoutes = require('./routes/ChatRoute');
const userRoutes = require('./routes/UserRoute');
const fixedDepositRoute = require('./routes/FixedDepositRoute')
const recurringDepositRoute = require('./routes/RecurringDepositRoute')


const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // frontend port
    methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT']
}));



mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('Connected to MongoDB');})
    .catch((err) => { console.error('Error connecting to MongoDB', err); });


app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/fixedDeposit', fixedDepositRoute);
app.use('/api/recurringDeposit', recurringDepositRoute);




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
