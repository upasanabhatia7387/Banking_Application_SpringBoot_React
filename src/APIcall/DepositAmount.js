import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const DepositAmount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  const handleDeposit = async () => {
    const amountNumber = Number(amount);

    if (!accountNumber || !amount || isNaN(amountNumber) || amountNumber <= 0) {
      setError('Please enter a valid account number and a positive amount.');
      setResponseMessage('');
      return;
    }

    if (amountNumber < 1 || amountNumber > 10000) {
      setError('Amount must be between 1 and 10,000.');
      setResponseMessage('');
      return;
    }

    try {
      const response = await ApiService.fetchAccountById(accountNumber);
      if (response.data) {
        if (response.data.enable === true) {
          const depositResponse = await ApiService.depositAmount(accountNumber, amountNumber);
          setAccountDetails(depositResponse.data);
          setResponseMessage('Amount deposited successfully');
          setError('');
        } else {
          setAccountDetails(null);
          setError('Account is disabled. Cannot deposit to a disabled account.');
          setResponseMessage('');
        }
      } else {
        setAccountDetails(null);
        setError('Account does not exist. Enter correct Account Number.');
        setResponseMessage('');
      }
    } catch (error) {
      console.error('Error fetching account details or depositing amount:', error);
      setAccountDetails(null);
      setError('Error fetching account details or depositing amount.');
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Deposit Amount</h2>
      <div className="form-group">
        <label>Enter Account Number: </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="form-control"
          style={{ width: '200px', display: 'inline-block' }}
        />
      </div>
      <div className="form-group">
        <label>Enter Amount: </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
          style={{ width: '200px', display: 'inline-block' }}
        />
      </div>
      <button onClick={handleDeposit} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
        Deposit
      </button>
      {responseMessage && <p className="text-success">{responseMessage}</p>}
      {accountDetails && (
        <div>
          <h3>Updated Account Details:</h3>
          <p>Account Number: {accountDetails.account_number}</p>
          <p>Account Holder Name: {accountDetails.account_holder_name}</p>
          <p>Account Balance: {accountDetails.account_balance}</p>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default DepositAmount;


