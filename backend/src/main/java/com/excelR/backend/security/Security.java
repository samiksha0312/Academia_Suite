package com.excelR.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class Security {
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
		.csrf(csrf -> csrf.disable())
		.cors()
		.and()
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**", "/oauth2/**").permitAll()
		.requestMatchers("/admin/**").hasRole("ADMIN")
		.requestMatchers("/student/**").hasRole("STUDENT")
		.requestMatchers("/instructor/**").hasRole("INSTRUCTOR")
		.requestMatchers("/course/**").hasRole("ADMIN")
		.requestMatchers("/enrollment/**").hasRole("ADMIN")
		.requestMatchers("/assignment/**").hasRole("INSTRUCTOR")
		.requestMatchers("/grades/**").hasAnyRole("ADMIN","INSTRUCTOR")
		.anyRequest().authenticated()); 
		return http.build();
	}
	
	
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}
}
