import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const DisableAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  const handleDisable = async () => {
    try {
      const response = await ApiService.fetchAccountById(accountNumber);
      const account = response.data;

      if (!account) {
        setError('Account does not exist.');
        setAccountDetails(null);
        setResponseMessage('');
        return;
      }

      if (!account.enable) {
        setError('Account is already disabled.');
        setAccountDetails(null);
        setResponseMessage('');
        return;
      }

      //if account present and also enabled then disable it
      const disableResponse = await ApiService.disabledAccount(accountNumber);
      const updatedAccount = disableResponse.data;

      setAccountDetails(updatedAccount);
      setResponseMessage('Account disabled successfully');
      setError('');
    } catch (error) {
      console.error('Error disabling account:', error);
      setError('Failed to disable account. Please try again.');
      setAccountDetails(null);
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Disable Account</h2>
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
      <button onClick={handleDisable} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
        Disable Account
      </button>
      {responseMessage && <p className="text-success">{responseMessage}</p>}
      {accountDetails && (
        <div>
          <h3>Updated Account Details:</h3>
          <p>Account Number: {accountDetails.account_number}</p>
          <p>Account Holder Name: {accountDetails.account_holder_name}</p>
          <p>Account Balance: {accountDetails.account_balance}</p>
          <p>Account Status: {accountDetails.enable ? 'Enabled' : 'Disabled'}</p>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default DisableAccount;
