package com.cnhalo.largierj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LargierjApplication {

	public static void main(String[] args) {
		SpringApplication.run(LargierjApplication.class, args);
	}

}
