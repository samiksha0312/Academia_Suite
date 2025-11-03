package com.excelR.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.excelR.backend.dao.AdminDao;
import com.excelR.backend.dto.LoginRequest;
import com.excelR.backend.dto.LoginResponse;
import com.excelR.backend.model.Admin;
import com.excelR.backend.service.JwtUtil;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
@RestController
@RequestMapping("/auth/admin")
public class AdminController {
	@Autowired
	AdminDao dao;
	
	@Autowired
	JwtUtil util;
	
	@Autowired
	AuthenticationManager manager;
	
	
	@PostMapping("/register")
	public ResponseEntity<Admin> registerUser(@RequestBody Admin admin) {
		return new ResponseEntity<Admin>(dao.saveUser(admin),HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest data) {
		try{
		Authentication authenticate = manager.authenticate
		(new UsernamePasswordAuthenticationToken(data.getUserName(), data.getPassword()));
		UserDetails details = (UserDetails)authenticate.getPrincipal();
		Admin user=dao.fetchUserByUserName(data.getUserName()).orElseThrow();
		String token = util.generateToken(details);
		LoginResponse response=new LoginResponse();
		response.setRole(user.getRole());
		response.setToken(token);
		response.setUserName(data.getUserName());
		return ResponseEntity.ok(response);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userName and password doesn't match");
		}
	}
	
}
