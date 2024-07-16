package com.example.bank_project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long account_number;
	@Column
	private String account_holder_name;
	@Column
	private Double account_balance;
	private boolean enable;
	private boolean disabled;
	public Account() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Account(Long account_number, String account_holder_name, Double account_balance, boolean enable,
			boolean disabled) {
		super();
		this.account_number = account_number;
		this.account_holder_name = account_holder_name;
		this.account_balance = account_balance;
		this.enable = enable;
		this.disabled = disabled;
	}
	public Long getAccount_number() {
		return account_number;
	}
	public void setAccount_number(Long account_number) {
		this.account_number = account_number;
	}
	public String getAccount_holder_name() {
		return account_holder_name;
	}
	public void setAccount_holder_name(String account_holder_name) {
		this.account_holder_name = account_holder_name;
	}
	public Double getAccount_balance() {
		return account_balance;
	}
	public void setAccount_balance(Double account_balance) {
		this.account_balance = account_balance;
	}
	public boolean isEnable() {
		return enable;
	}
	public void setEnable(boolean enable) {
		this.enable = enable;
	}
	public boolean isDisabled() {
		return disabled;
	}
	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}
	@Override
	public String toString() {
		return "Account [account_number=" + account_number + ", account_holder_name=" + account_holder_name
				+ ", account_balance=" + account_balance + ", enable=" + enable + ", disabled=" + disabled + "]";
	}
	
	
	
//	public Account() {
//		super();
//		// TODO Auto-generated constructor stub
//	}
//	public Account(Long account_number, String account_holder_name, Double account_balance, boolean enable, boolean disabled) {
//		super();
//
//		this.account_holder_name = account_holder_name;
//		this.account_balance = account_balance;
//		this.enable = enable;
//		this.disabled = disabled;
//		
//	}
//	
//	public boolean isEnable() {
//		return enable;
//	}
//	public void setEnable(boolean enable) {
//		this.enable = enable;
//	}
//	public boolean isDisabled() {
//		return disabled;
//	}
//	public void setDisabled(boolean disabled) {
//		this.disabled = disabled;
//	}
//	public Long getAccount_number() {
//		return account_number;
//	}
//	public void setAccount_number(Long account_number) {
//		this.account_number = account_number;
//	}
//	public String getAccount_holder_name() {
//		return account_holder_name;
//	}
//	public void setAccount_holder_name(String account_holder_name) {
//		this.account_holder_name = account_holder_name;
//	}
//	public Double getAccount_balance() {
//		return account_balance;
//	}
//	public void setAccount_balance(Double account_balance) {
//		this.account_balance = account_balance;
//	}
//
//	@Override
//	public String toString() {
//		return "Account [account_number=" + account_number + ", account_holder_name=" + account_holder_name
//				+ ", account_balance=" + account_balance + ", enable=" + enable + ", disabled=" + disabled + "]";
//	}
//	
	
	
	
}
