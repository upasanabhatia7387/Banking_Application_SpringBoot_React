package com.example.bank_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank_project.entity.Account;
import com.example.bank_project.service.AccountService;

@RestController
@RequestMapping("account")
//cross origin resource sharing
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
	
	@Autowired
	AccountService service;
	
	//create account
	@PostMapping("/create")
	public ResponseEntity<Account> createAccount(@RequestBody Account account) {
		Account createAccount = service.createAccount(account);
		return ResponseEntity.status(HttpStatus.CREATED).body(createAccount);
	}
	
	//get account details by accoundnumber(id)
	@GetMapping("/{accountNumber}")
	public ResponseEntity<?> getAccountByAccountNumber(@PathVariable Long accountNumber) {
	try {
	Account account = service.getAccountDetailsByAccountNumber(accountNumber);
	return ResponseEntity.ok(account);
	}
	catch (Exception e){
		return ResponseEntity.ok(0);
	}
	}
	
	//get all accounts 
	@GetMapping("/getallaccounts")
	public List<Account> getAllAccountDetails(){
	List<Account> allAccountDetails = service.getAllAccountDetails();
	return allAccountDetails;
	}
	
	
	@PutMapping("/deposit/{accountNumber}/{amount}")
	//@PreAuthorize("hasAuthority('ROLE_USER')")
	public Account depositAccount(@PathVariable Long accountNumber, @PathVariable Double amount) {
	    Account account = service.depositAmount(accountNumber, amount);
	    return account;
	}

	//withdrawal amount from account
	//@PreAuthorize("hasAuthority('ROLE_USER')")
	@PutMapping("/withdrwa/{accountNumber}/{amount}")
	public Account withdrwaAccount(@PathVariable Long accountNumber, @PathVariable Double amount) {
		Account account = service.withdrwaAmount(accountNumber, amount);
		return account;
	}
	
	//delete account
	//@PreAuthorize("hasAuthority('ROLE_USER')")
	@DeleteMapping("/delete/{accountNumber}")
	public ResponseEntity <String> deleteAccount(@PathVariable Long accountNumber) {
		service.closeAccount(accountNumber);
		return ResponseEntity.ok("Account closed");
		}
	
	//enable account
	@PutMapping("/enable/{accountNumber}")
    public ResponseEntity<?> enableAccount(@PathVariable Long accountNumber) {
        try {
            Account enabledAccount = service.enableAccount(accountNumber);
            return ResponseEntity.ok(enabledAccount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account does not exist");
        }
    }

	//disable account
	@PutMapping("/disable/{accountNumber}")
    public ResponseEntity<?> disableAccount(@PathVariable Long accountNumber) {
        try {
            Account disabledAccount = service.disableAccount(accountNumber);
            return ResponseEntity.ok(disabledAccount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account does not exist");
        }
    }
//    @PutMapping("/disable/{accountNumber}")
//  //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
//    public Account disableAccount(@PathVariable Long accountNumber) {
//        return service.disableAccount(accountNumber);
//    }

	@PutMapping("/transfer/{fromAccountNumber}/{toAccountNumber}/{amount}")
	public ResponseEntity<String> transferAmount(
	        @PathVariable Long fromAccountNumber,
	        @PathVariable Long toAccountNumber,
	        @PathVariable Double amount) {

	    try {
	        // Validate inputs and perform transfer logic
	        service.transferAmount(fromAccountNumber, toAccountNumber, amount);
	        
	        return ResponseEntity.ok("Transfer successful");
	    } catch (Exception e) {
	        System.err.println("Transfer Error: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	    }
	}


}
