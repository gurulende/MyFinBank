import React, { useState } from 'react';
import './RecurringDepositTerms.css'; 

const RecurringDepositTerms = () => {
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [maturityValue, setMaturityValue] = useState(null);

  const interestRate = 0.08; // 8% interest rate

  const calculateMaturityValue = () => {
    const monthlyDeposit = parseFloat(monthlyAmount);
    const months = parseFloat(tenure) * 12; // Convert years to months
    
    if (isNaN(monthlyDeposit) || isNaN(months) || monthlyDeposit <= 0 || months <= 0) {
      alert('Please enter valid monthly amounts and tenures.');
      return;
    }
    
    // Future Value of a series formula (Monthly Compounded Interest)
    const rate = interestRate / 12;
    const maturityAmount = monthlyDeposit * ((Math.pow(1 + rate, months) - 1) / rate);
    setMaturityValue(maturityAmount.toFixed(2));
  };

  return (
    <div className="container">
      <h1>Recurring Deposit Terms and Conditions</h1>
      <section className="terms-section">
        <h2>1. Definition</h2>
        <p>A Recurring Deposit (RD) is a financial product offered by banks and other financial institutions where you deposit a fixed amount every month for a specific tenure and earn interest on it.</p>
        
        <h2>3. Deposit Amount</h2>
        <p>The minimum and maximum monthly deposit amounts are as per the institution's policy. The deposit amount must be made monthly throughout the tenure.</p>

        <h2>4. Interest Rate</h2>
        <p>The interest rate applicable to the Recurring Deposit is 8% per annum. Interest rates are subject to change based on the institution’s policies and prevailing market conditions.</p>

        <h2>5. Tenure</h2>
        <p>The tenure of the Recurring Deposit can range from [Specify Minimum Tenure] to [Specify Maximum Tenure] months/years. Premature withdrawal before the completion of the tenure may incur a penalty and affect the interest rate.</p>

        <h2>6. Interest Payment</h2>
        <p>Interest will be compounded monthly and paid at maturity, along with the principal amount.</p>

        <h2>9. Taxation</h2>
        <p>Interest earned on Recurring Deposits is subject to tax as per the applicable laws and regulations. The depositor is responsible for reporting and paying any taxes due.</p>

        <h2>10. Nomination</h2>
        <p>Depositors may nominate an individual to receive the RD amount in case of their death. Nomination details must be provided at the time of account opening.</p>
      </section>

      <section className="calculator-section">
        <h2>Recurring Deposit Calculator</h2>
        <div className="calculator">
          <label>
            Monthly Deposit Amount:
            <input
              type="number"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              placeholder="Enter monthly deposit amount"
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

export default RecurringDepositTerms;
