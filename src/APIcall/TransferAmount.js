import React, { useState } from 'react';
import ApiService from '../service/ApiService';

const TransferAmount = () => {
  const [fromAccountNumber, setFromAccountNumber] = useState('');
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = async () => {
    try {
      const fromAccountNumberValue = parseInt(fromAccountNumber);
      const toAccountNumberValue = parseInt(toAccountNumber);
      const amountValue = parseFloat(amount);

      if (isNaN(fromAccountNumberValue) || isNaN(toAccountNumberValue) || isNaN(amountValue)) {
        throw new Error("Invalid input data");
      }

      if (amountValue <= 0) {
        throw new Error("Transfer amount must be a positive number");
      }

      if (amountValue >= 5000) {
        throw new Error("Amount exceeds transfer limit of 5000");
      }

      if (fromAccountNumber === toAccountNumber) {
        throw new Error("Source and destination account cannot be the same");
      }

      let fromAccountDetails = await ApiService.fetchAccountById(fromAccountNumber);
      if (!fromAccountDetails.data) {
        throw new Error("Source account does not exist");
      }

      if (!fromAccountDetails.data.enable) {
        throw new Error("Source account is disabled. Cannot transfer from a disabled account.");
      }

      let toAccountDetails = await ApiService.fetchAccountById(toAccountNumber);
      if (!toAccountDetails.data) {
        throw new Error("Destination account does not exist");
      }

      if (!toAccountDetails.data.enable) {
        throw new Error("Destination account is disabled. Cannot transfer to a disabled account.");
      }

      if (amountValue > fromAccountDetails.data.account_balance) {
        throw new Error("Insufficient balance for transfer");
      }

      const response = await ApiService.transferAmount(fromAccountNumber, toAccountNumber, amountValue);
      if (response.status === 200) {
        setResponseMessage('Amount transferred successfully');
        setError('');
      } else {
        throw new Error('Failed to transfer amount');
      }
    } catch (error) {
      setError(error.message);
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Transfer Amount</h2>
      <div className="form-group">
        <label>From Account Number: </label>
        <input
          type="text"
          value={fromAccountNumber}
          onChange={(e) => setFromAccountNumber(e.target.value)}
          className="form-control"
          style={{ width: '200px', display: 'inline-block' }}
        />
      </div>
      <div className="form-group">
        <label>To Account Number: </label>
        <input
          type="text"
          value={toAccountNumber}
          onChange={(e) => setToAccountNumber(e.target.value)}
          className="form-control"
          style={{ width: '200px', display: 'inline-block' }}
        />
      </div>
      <div className="form-group">
        <label>Amount: </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
          style={{ width: '200px', display: 'inline-block' }}
        />
      </div>
      <button onClick={handleTransfer} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
        Transfer Amount
      </button>
      {responseMessage && <p className="text-success">{responseMessage}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default TransferAmount;


// import React, { useState } from 'react';
// import ApiService from '../service/ApiService';

// const TransferAmount = () => {
//   const [fromAccountNumber, setFromAccountNumber] = useState('');
//   const [toAccountNumber, setToAccountNumber] = useState('');
//   const [amount, setAmount] = useState('');
//   const [responseMessage, setResponseMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleTransfer = async () => {
//     try {
//       const fromAccountNumberValue = parseInt(fromAccountNumber);
//       const toAccountNumberValue = parseInt(toAccountNumber);
//       const amountValue = parseFloat(amount);

//       if (isNaN(fromAccountNumberValue) || isNaN(toAccountNumberValue) || isNaN(amountValue)) {
//         throw new Error("Invalid input data");
//       }

//       if (amountValue <= 0) {
//         throw new Error("Transfer amount must be a positive number");
//       }

//       if (amountValue >= 5000) {
//         throw new Error("Amount exceeds transfer limit of 5000");
//       }

//       if (fromAccountNumber === toAccountNumber) {
//         throw new Error("Source and destination account cannot be the same");
//       }

//       let fromAccountDetails = await ApiService.fetchAccountById(fromAccountNumber);
//       if (!fromAccountDetails.data) {
//         throw new Error("Source account does not exist");
//       }

//       let toAccountDetails = await ApiService.fetchAccountById(toAccountNumber);
//       if (!toAccountDetails.data) {
//         throw new Error("Destination account does not exist");
//       }

//       if (amountValue > fromAccountDetails.data.account_balance) {
//         throw new Error("Insufficient balance for transfer");
//       }

//       const response = await ApiService.transferAmount(fromAccountNumber, toAccountNumber, amountValue);
//       if (response.status === 200) {
//         setResponseMessage('Amount transferred successfully');
//         setError('');
//       } else {
//         throw new Error('Failed to transfer amount');
//       }
//     } catch (error) {
//       setError(error.message);
//       setResponseMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>Transfer Amount</h2>
//       <div className="form-group">
//         <label>From Account Number: </label>
//         <input
//           type="text"
//           value={fromAccountNumber}
//           onChange={(e) => setFromAccountNumber(e.target.value)}
//           className="form-control"
//           style={{ width: '200px', display: 'inline-block' }}
//         />
//       </div>
//       <div className="form-group">
//         <label>To Account Number: </label>
//         <input
//           type="text"
//           value={toAccountNumber}
//           onChange={(e) => setToAccountNumber(e.target.value)}
//           className="form-control"
//           style={{ width: '200px', display: 'inline-block' }}
//         />
//       </div>
//       <div className="form-group">
//         <label>Amount: </label>
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="form-control"
//           style={{ width: '200px', display: 'inline-block' }}
//         />
//       </div>
//       <button onClick={handleTransfer} className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '12px' }}>
//         Transfer Amount
//       </button>
//       {responseMessage && <p className="text-success">{responseMessage}</p>}
//       {error && <p className="text-danger">{error}</p>}
//     </div>
//   );
// };

// export default TransferAmount;


