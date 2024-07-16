import { useState } from "react";
import React from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [account_number, setAccount_number] = useState("");
  const [account_holder_name, setAccount_holder_name] = useState("");
  const [account_balance, setAccount_balance] = useState("");
  const [nameError, setNameError] = useState("");
  const [balanceError, setBalanceError] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  
  const handleNameChange = (e) => {
    const value = e.target.value;
    setAccount_holder_name(value);
    const namePattern = /^[A-Za-z]+[A-Za-z\s]*[A-Za-z]+$/;
    if (!namePattern.test(value)) {
      setNameError("Name must start and end with letters and contain no special characters");
    } else {
      setNameError('');
    }
  };

  const handleBalanceChange = (e) => {
    const value = e.target.value;
    setAccount_balance(value);
    if (Number(value) <= 0) {
      setBalanceError("Balance must be a positive number greater than zero.");
    } else {
      setBalanceError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account_holder_name || !account_balance) {
      setError("This is required field");
      return;
    }
    if (nameError || balanceError) {
      return;
    }
    try {
      const response = await ApiService.createAccount({
        account_number: account_number,
        account_holder_name: account_holder_name,
        account_balance: account_balance,
      });
      console.log("Account created successfully:", response.data);
      navigate("/account");
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Error creating account.");
    }
  };
  
  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={ handleSubmit }>
        <div className="form-group">
          <label>Account Holder Name: </label>
          <input
            type="text"
            value={account_holder_name}
            onChange={handleNameChange}
            required
          />
          {nameError && <p className="text-danger">{nameError}</p>}
        </div>
        <div className="form-group">
          <label>Account Balance: </label>
          <input
            type="number"
            value={account_balance}
            onChange={handleBalanceChange}
            required
          />
          {balanceError && <p className="text-danger">{balanceError}</p>}
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;




// import { useState } from "react";
// import React from "react";
// import ApiService from "../service/ApiService";
// import { useNavigate } from "react-router-dom";

// const CreateAccount = () => {
//   const [account_number, setAccount_number] = useState("");
//   const [account_holder_name, setAccount_holder_name] = useState("");
//   const [account_balance, setAccount_balance] = useState("");
//   const navigate = useNavigate();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await ApiService.createAccount({
//             account_number: account_number,
//             account_holder_name: account_holder_name,
//             account_balance: account_balance
//         });
//         console.log('Account created successfully:', response.data);
//         navigate("/account");
//     } catch (error) {
//         console.error('Error creating account:', error);
        
//     }
// };
  
  
//   return (
//     <div>
//       <h2>Create Account</h2>
//       <form onSubmit={ handleSubmit }>
//         {/* <div>
//           <label>Account Number: </label>
//           <input
//             type="text"
//             value={account_number}
//             onChange={(e) => setAccount_number(e.target.value)}
//           />
//         </div> */}
//         <div className="form-group">
//           <label>Account Holder Name: </label>
//           <input
//             type="text"
//             value={account_holder_name}
//             onChange={(e) => setAccount_holder_name(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Account Balance: </label>
//           <input
//             type="number"
//             value={account_balance}
//             onChange={(e) => setAccount_balance(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Create Account</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAccount;