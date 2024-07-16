package com.example.bank_project.service;

import java.util.List;
import java.util.Optional;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bank_project.entity.Account;
import com.example.bank_project.repository.AccountRepository;

import jakarta.transaction.Transactional;

@Service
public class AccountServiceImpl implements AccountService{
	
	@Autowired
	AccountRepository repo;

	//create account
	@Override
	public Account createAccount(Account account) {
		Account account_saved = repo.save(account);
		return account_saved;
		
	}

	//get account by id(number)
	@Override
	public Account getAccountDetailsByAccountNumber(Long accountNumber) {
		Optional<Account> account = repo.findById(accountNumber) ;
		if(account.isEmpty()) {
			throw new RuntimeException("Account does not exist");
		}
		Account account_found=account.get();
		return account_found;
	}

	//get all accounts 
	@Override
	public List<Account> getAllAccountDetails(){
		List<Account> listOfAccounts = repo.findAll();
		return listOfAccounts;
	}

	//deposit amount in account
	@Override
	public Account depositAmount(Long accountNumber, Double amount) {
		Optional<Account> account = repo.findById(accountNumber);
		if (account.isEmpty()) {
			throw new RuntimeException("Account doesn'e exist");
		}
		Account accountPresent=account.get();
		Double tottalBalance=accountPresent.getAccount_balance()+amount;
		accountPresent.setAccount_balance(tottalBalance);
		repo.save(accountPresent);
		
		return accountPresent;
	}

	
	 //withdrawal amount from account
    @Override
    public Account withdrwaAmount(Long accountNumber, Double amount) {
        Optional<Account> account = repo.findById(accountNumber);
        if (account.isEmpty()) {
            throw new RuntimeException("Account doesn't exist");
        }
        Account accountPresent = account.get();
        Double currentBalance = accountPresent.getAccount_balance();
        
        if (amount > currentBalance) {
            throw new RuntimeException("Insufficient balance. Please enter a valid amount.");
        }

        Double accountBalance = currentBalance - amount;
        accountPresent.setAccount_balance(accountBalance);
        repo.save(accountPresent);

        return accountPresent;
    }

	//delete account
	@Override
	public void closeAccount(Long accountNumber) {
		getAccountDetailsByAccountNumber(accountNumber) ;
		repo.deleteById(accountNumber) ;
	}
	
	//enable account
	@Override
    public Account enableAccount(Long accountNumber) {
        Account account = getAccountDetailsByAccountNumber(accountNumber);
        account.setEnable(true);
        account.setDisabled(false);
        return repo.save(account);
    }

	//disable account
    @Override
    public Account disableAccount(Long accountNumber) {
        Account account = getAccountDetailsByAccountNumber(accountNumber);
        account.setEnable(false);
        account.setDisabled(true);
        return repo.save(account);
    }

    @Override
    @Transactional 
    public void transferAmount(Long fromAccountNumber, Long toAccountNumber, Double amount) {
        //retrieving both the accounts
        Account fromAccount = getAccountDetailsByAccountNumber(fromAccountNumber);
        Account toAccount = getAccountDetailsByAccountNumber(toAccountNumber);
        

        if (fromAccount == null) {
            throw new RuntimeException("Source account does not exist");
        }
        if (toAccount == null) {
            throw new RuntimeException("Destination account does not exist");
        }

        if (amount <= 0) {
            throw new RuntimeException("Transfer amount must be a positive number");
        }

        if (amount >= 5000) {
            throw new RuntimeException("Amount exceeds transfer limit of 5000");
        }

 
        Double fromBalance = fromAccount.getAccount_balance();
        if (amount > fromBalance) {
            throw new RuntimeException("Insufficient balance for transfer");
        }

    
        Double newFromBalance = fromAccount.getAccount_balance() - amount;
        Double toBalance = toAccount.getAccount_balance() + amount;

        fromAccount.setAccount_balance(newFromBalance);
        toAccount.setAccount_balance(toBalance);

        
        repo.save(fromAccount);
        repo.save(toAccount);
    }

}
