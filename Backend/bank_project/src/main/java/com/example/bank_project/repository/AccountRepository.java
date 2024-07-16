package com.example.bank_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bank_project.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
