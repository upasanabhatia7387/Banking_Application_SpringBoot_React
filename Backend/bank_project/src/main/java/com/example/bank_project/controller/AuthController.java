package com.example.bank_project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank_project.dto.UserDTO;
//import com.example.bank_project.service.JwtService;
import com.example.bank_project.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {


//	@Autowired
//    private JwtService jwtService;

//	@Autowired
//    private AuthenticationManager authenticationManager;

	@Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
        userService.register(userDTO);
        return "User registered successfully with role: " + userDTO.getRole();
    }
//	@PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
//        userService.register(userDTO);
//        return ResponseEntity.status(HttpStatus.CREATED)
//                             .body("User registered successfully with role: " + userDTO.getRole());
//    }

    @GetMapping("/login")
    public String login() {
        return "Login Successful";
    }

//    @PostMapping("/authenticate")
//    public String authenticateAndGetToken(@RequestBody UserDTO userDTO) {
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword()));
//        if (authentication.isAuthenticated()) {
//        	System.out.println("authenticate");
//            return jwtService.generateToken(userDTO.getUsername());
//        } else {
//            throw new UsernameNotFoundException("invalid user request !");
//        }
//
//
//    }

//	@PostMapping("/authenticate")
//    public ResponseEntity<?> authenticateAndGetToken(@RequestBody UserDTO userDTO) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
//            );
//            String token = jwtService.generateToken(userDTO.getUsername());
//            return ResponseEntity.ok(token);
//        } catch (UsernameNotFoundException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
}
