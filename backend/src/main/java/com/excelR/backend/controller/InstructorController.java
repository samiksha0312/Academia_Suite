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

import com.excelR.backend.dao.InstructorDao;
import com.excelR.backend.model.Instructor;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/auth/instructor")
public class InstructorController {
	@Autowired
	InstructorDao dao;
	
	@PostMapping("/register")
	public ResponseEntity<Instructor> registerUser(@RequestBody Instructor instructor) {
		return new ResponseEntity<Instructor>(dao.saveUser(instructor),HttpStatus.CREATED);
	}
}
