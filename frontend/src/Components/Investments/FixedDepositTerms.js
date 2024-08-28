import React, { useState } from 'react';
import './FixedDepositTerms.css'; 

const FixedDepositTerms = () => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [maturityValue, setMaturityValue] = useState(null);

  const interestRate = 0.07; // 7% interest rate

  const calculateMaturityValue = () => {
    const principal = parseFloat(amount);
    const time = parseFloat(tenure);
    
    if (isNaN(principal) || isNaN(time) || principal <= 0 || time <= 0) {
      alert('Please enter valid amounts and tenures.');
      return;
    }
    
    // Simple interest calculation
    const maturityAmount = principal * (1 + interestRate * time);
    setMaturityValue(maturityAmount.toFixed(2));
  };

  return (
    <div className="container">
      <h1>Fixed Deposit Terms and Conditions</h1>
      <section className="terms-section">
        <h2>1. Definition</h2>
        <p>A Fixed Deposit (FD) is a financial product offered by banks and other financial institutions that provides investors with a higher rate of interest than a regular savings account, until the given maturity date.</p>
        
        <h2>3. Deposit Amount</h2>
        <p>The minimum and maximum deposit amounts are as per the institution's policy. The deposit amount must be made in a lump sum at the time of account opening.</p>

        <h2>4. Interest Rate</h2>
        <p>The interest rate applicable to the Fixed Deposit is 7% per annum. Interest rates are subject to change based on the institution’s policies and prevailing market conditions.</p>

        <h2>5. Tenure</h2>
        <p>The tenure of the Fixed Deposit can range from [Specify Minimum Tenure] to [Specify Maximum Tenure] months/years. Premature withdrawal before the completion of the tenure may incur a penalty and affect the interest rate.</p>

        <h2>6. Interest Payment</h2>
        <p>Interest can be paid monthly, quarterly, annually, or at maturity, as chosen by the depositor. Interest payments will be made directly to the depositor’s savings account or as per the institution’s policy.</p>

        <h2>9. Taxation</h2>
        <p>Interest earned on Fixed Deposits is subject to tax as per the applicable laws and regulations. The depositor is responsible for reporting and paying any taxes due.</p>

        <h2>10. Nomination</h2>
        <p>Depositors may nominate an individual to receive the FD amount in case of their death. Nomination details must be provided at the time of account opening.</p>
      </section>

      <section className="calculator-section">
        <h2>Fixed Deposit Calculator</h2>
        <div className="calculator">
          <label>
            Deposit Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </label>
          <label>
            Tenure (in years):
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure"
            />
          </label>
          <button onClick={calculateMaturityValue}>Calculate</button>
          {maturityValue !== null && (
            <div className="result">
              <h3>Maturity Value: ₹{maturityValue}</h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FixedDepositTerms;
