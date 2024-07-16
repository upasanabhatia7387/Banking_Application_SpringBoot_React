import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const FetchAccountById = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      console.log('Fetching account with number:', accountNumber);
      const response = await ApiService.fetchAccountById(accountNumber);
      if (response.data) {
        if (response.data.enable) {
          setAccountDetails(response.data);
          setError('');
        } else {
          setAccountDetails(null);
          setError('Account is disabled.');
        }
      } else {
        setAccountDetails(null);
        setError('Account does not exist. Enter correct Account Number.');
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
      setError('Account does not exist. Enter correct Account Number.');
    }
  };

  return (
    <div>
      <h2>Fetch Account by ID</h2>
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
      <button onClick={handleFetch} className="btn btn-primary">Fetch Account</button>
      {accountDetails && (
        <div>
          <h3>Account Details:</h3>
          <p>Account Number: {accountDetails.account_number}</p>
          <p>Account Holder Name: {accountDetails.account_holder_name}</p>
          <p>Account Balance: {accountDetails.account_balance}</p>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default FetchAccountById;

