package com.example.bank_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.bank_project")
public class BankProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(BankProjectApplication.class, args);
    }
}
