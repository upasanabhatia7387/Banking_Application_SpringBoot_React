package com.example.bank_project.service;

import org.springframework.stereotype.Service;

import com.example.bank_project.dto.UserDTO;
import com.example.bank_project.entity.User;

@Service
public interface UserService {
	User register(UserDTO userDTO);

	User findByUsername(String username);

//	public User saveUser(User user);
//
//	public List<User> getAllUsers();


}