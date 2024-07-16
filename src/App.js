//import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Account from './APIcall/Account';
import CreateAccount from './APIcall/CreateAccount';
import FetchAccountById from './APIcall/FetchAccountById';
import DepositAmount from './APIcall/DepositAmount';
import WithdrawAmount from './APIcall/WithdrawAmount';
import EnableAccount from './APIcall/EnableAccount';
import DisableAccount from './APIcall/DisableAccount';
import TransferAmount from './APIcall/TransferAmount';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/createAccount" element={<CreateAccount/>}/>
        <Route exact path="/fetchAccountById" element={<FetchAccountById />} />
        <Route exact path="/depositAmount" element={<DepositAmount />} />
        <Route exact path="/widrawAmount" element={<WithdrawAmount />} />
        <Route exact path="/enableAccount" element={<EnableAccount/>} />
        <Route exact path="/disabledAccount" element={<DisableAccount/>} />
        <Route exact path="/transferAmount" element={<TransferAmount/>} />
      </Routes>
    </div>
  );
}

export default App;
