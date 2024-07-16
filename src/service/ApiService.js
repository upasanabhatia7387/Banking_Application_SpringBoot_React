import axios from "axios";

class ApiService {
    fetchAccount() {
        return axios.get('http://localhost:8080/account/getallaccounts');//users
    }
    
    createAccount(account){
        return axios.post("http://localhost:8080/account/create", account);
    }

    deleteAccount(accountNumber) {
        return axios.delete(`http://localhost:8080/account/delete/${accountNumber}`);
     }

    fetchAccountById(accountNumber) {
        return axios.get(`http://localhost:8080/account/${accountNumber}`);
      }

    depositAmount(accountNumber, amount) {
        return axios.put(`http://localhost:8080/account/deposit/${accountNumber}/${amount}`);
    }

    withdrawAmount(accountNumber, amount) {
        return axios.put(`http://localhost:8080/account/withdrwa/${accountNumber}/${amount}`);
    }

    enableAccount(accountNumber) {
        return axios.put(`http://localhost:8080/account/enable/${accountNumber}`);
    }

    disabledAccount(accountNumber) {
        return axios.put(`http://localhost:8080/account/disable/${accountNumber}`);
    }
    
    transferAmount(fromAccountNumber, toAccountNumber, amount) {
        return axios.put(`http://localhost:8080/account/transfer/${fromAccountNumber}/${toAccountNumber}/${amount}`);
    }
}


export default new ApiService();


