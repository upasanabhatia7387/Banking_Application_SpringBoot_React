package com.example.bank_project.service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.bank_project.dto.UserDTO;
import com.example.bank_project.entity.Role;
import com.example.bank_project.entity.User;
import com.example.bank_project.repository.RoleRepository;
import com.example.bank_project.repository.UserRepository;

@Service
//public class UserServiceImpl implements UserService, UserDetailsService{
	public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

//	@Autowired
//	private PasswordEncoder passwordEncoder;



	@Override
	public User register(UserDTO userDTO) {
		User user = new User();
		user.setUsername(userDTO.getUsername());
		//user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setPassword(userDTO.getPassword());
		Set<Role> roles = new HashSet<>();
		Role role = roleRepository.findByName("ROLE_" +userDTO.getRole().toUpperCase());
		if (role!=null) {
			roles.add(role);
		}
		else {
			throw new RuntimeException("Role not found");
		}
		user.setRoles(roles);

		return userRepository.save(user);
	}

@Override
public User findByUsername(String username) {
	// TODO Auto-generated method stub
	return null;
}




//	@Override
//    public User findByUsername(String username) {
//        return userRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//    }
//
//	@Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//                user.getRoles().stream()
//                    .map(role -> new SimpleGrantedAuthority(role.getName()))
//                    .collect(Collectors.toList())
//        );
//        }


}
