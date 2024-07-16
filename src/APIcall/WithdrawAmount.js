import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const WithdrawAmount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  const handleWithdraw = async () => {
    if (!accountNumber || !amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid account number and a positive amount.');
      setResponseMessage('');
      return;
    }

    try {
      const response = await ApiService.fetchAccountById(accountNumber);
      if (response.data) {
        if (response.data.enable === true) { 
      const response = await ApiService.withdrawAmount(accountNumber, amount);
      setAccountDetails(response.data);
      setResponseMessage('Amount withdrawn successfully');
      setError('');
    } else{
          setError('Account is disabled. Cannot withdraw from a disabled account.');
          setAccountDetails(null);
          setResponseMessage('');
        }
      } else {
        setError('Account does not exist. Enter correct Account Number.');
        setAccountDetails(null);
        setResponseMessage('');
      }}
      catch (error) {
      console.error('Error withdrawing amount:', error);
      const errorMessage = error.response?.data?.message || 'Account does not exist.';
      setError(errorMessage);
      setResponseMessage('');
      setAccountDetails(null);
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Withdraw Amount</h2>
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
      <button onClick={handleWithdraw} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
        Withdraw
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

export default WithdrawAmount;
