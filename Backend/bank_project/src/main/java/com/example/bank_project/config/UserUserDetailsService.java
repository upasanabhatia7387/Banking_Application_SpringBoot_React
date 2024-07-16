//package com.example.bank_project.config;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Component;
//
//import com.example.bank_project.entity.User;
//import com.example.bank_project.repository.UserRepository;
//
//@Component
//public class UserUserDetailsService implements UserDetailsService {
//
//	 @Autowired
//	 private UserRepository repository;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Optional<User> user = repository.findByUsername(username);
//        return user.map(UserUserDetails::new)
//                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));
//	}
//
//}
