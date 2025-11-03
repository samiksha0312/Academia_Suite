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

import com.excelR.backend.dao.StudentDao;
import com.excelR.backend.model.Student;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/auth/student")
public class StudentController {
	@Autowired
	StudentDao dao;
	
	@PostMapping("/register")
	public ResponseEntity<Student> registerUser(@RequestBody Student student) {
		return new ResponseEntity<Student>(dao.saveUser(student),HttpStatus.CREATED);
	}
}
