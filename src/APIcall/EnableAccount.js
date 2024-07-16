import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const EnableAccount = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  const handleEnable = async () => {
    try {
      const response = await ApiService.fetchAccountById(accountNumber);
      const account = response.data;

      if (!account) {
        setError('Account does not exist.');
        setAccountDetails(null);
        setResponseMessage('');
        return;
      }

      if (account.enable) {
        setError('Account is already enabled.');
        setAccountDetails(null);
        setResponseMessage('');
        return;
      }
      //if account present and not enable then enable it
      const enableResponse = await ApiService.enableAccount(accountNumber);
      const updatedAccount = enableResponse.data;

      setAccountDetails(updatedAccount);
      setResponseMessage('Account enabled successfully');
      setError('');
    } catch (error) {
      console.error('Error enabling account:', error);
      setError('Failed to enable account. Please try again.');
      setAccountDetails(null);
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Enable Account</h2>
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
      <button onClick={handleEnable} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
        Enable Account
      </button>
      {responseMessage && <p className="text-success">{responseMessage}</p>}
      {accountDetails && (
        <div>
          <h3>Updated Account Details:</h3>
          <p>Account Number: {accountDetails.account_number}</p>
          <p>Account Holder Name: {accountDetails.account_holder_name}</p>
          <p>Account Balance: {accountDetails.account_balance}</p>
          <p>Account Status: {accountDetails.enabled ? 'Disabled' : 'Enabled'}</p>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default EnableAccount;


