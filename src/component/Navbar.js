import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return(
        <>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Account Details</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        {/* <li class="nav-item active">
            <Link class="nav-link" to="/">Index <span class="sr-only">(current)</span></Link>
        </li> */}
        
        <li class="nav-item">
            <Link class="nav-link" to="account">Account</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/createAccount">Create Account</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/enableAccount">Enable Account</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/disabledAccount">Disable Account</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/fetchAccountById">Fetch Account by ID</Link>
          </li>
         <li className="nav-item">
            <Link className="nav-link" to="/depositAmount">Deposit Amount</Link>
        </li> 
        <li className="nav-item">
            <Link className="nav-link" to="/widrawAmount">Withdraw Amount</Link>
        </li> 
        
        <li className="nav-item">
            <Link className="nav-link" to="/transferAmount">Transfer Amount</Link>
        </li>
      </ul>
    </div>
  </nav>
    </>
    )
}

export default Navbar