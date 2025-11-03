package com.excelR.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.excelR.backend.dao.AdminDao;
import com.excelR.backend.model.Admin;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/auth/admin")
public class AdminController {
	@Autowired
	AdminDao dao;
	
	@PostMapping("/register")
	public ResponseEntity<Admin> registerUser(@RequestBody Admin admin) {
		return new ResponseEntity<Admin>(dao.saveUser(admin),HttpStatus.CREATED);
	}
}
