package com.example.bank_project.service;

import java.util.List;

import com.example.bank_project.entity.Account;

public interface AccountService {
	public Account createAccount(Account account);
	public Account getAccountDetailsByAccountNumber(Long accountNumber);
	public List<Account> getAllAccountDetails();
	public Account depositAmount(Long accountNumber,Double amount); 
	public Account withdrwaAmount(Long accountNumber,Double amount);
	public void closeAccount(Long accountNumber);
	public Account enableAccount(Long accountNumber);
    public Account disableAccount(Long accountNumber);
    public void transferAmount(Long fromAccountNumber, Long toAccountNumber, Double amount);
}
