import React, { Component } from "react";
import ApiService from "../service/ApiService";
import { Link } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [], //users
    };
  }

  componentDidMount() {
    this.loadAccountList();
  }

  //fetching the account with enabled or disabled status
  loadAccountList() {
    ApiService.fetchAccount()
      .then((response) => {
        this.setState({ accounts: response.data });
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });
  }

  // Delete account handler
  handleDelete = (accountNumber) => {
    ApiService.deleteAccount(accountNumber)
      .then(() => {
        console.log("Account deleted successfully");
        this.loadAccountList();
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  //fetching account details by accountnumber
  fetchAccountById = (accountNumber) => {
    ApiService.fetchAccountById(accountNumber)
      .then((account) => {
        console.log("Fetched account details:", account);
      })
      .catch((error) => {
        console.error("Error fetching account details:", error);
      });
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Account Details</h2>
        <Link className="nav-link" to="/createAccount">
          Create Account
        </Link>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              <th>Account Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.accounts.map((account) => (
              <tr key={account.account_number}>
                <td>{account.account_number}</td>
                <td>{account.account_holder_name}</td>
                <td>{account.account_balance}</td>
                <td>{account.enable ? "Enabled" : "Disabled"}</td> {/* Display enabled or disabled */}
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(account.account_number)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Account;


