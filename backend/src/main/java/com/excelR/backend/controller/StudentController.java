package com.excelR.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.excelR.backend.dao.StudentDao;
import com.excelR.backend.dto.LoginRequest;
import com.excelR.backend.dto.LoginResponse;
import com.excelR.backend.model.Student;
import com.excelR.backend.service.JwtUtil;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
@RestController
@RequestMapping("/auth/student")
public class StudentController {
	@Autowired
	StudentDao dao;
	
	@Autowired
	JwtUtil util;
	
	@Autowired
	AuthenticationManager manager;
	
	@PostMapping("/register")
	public ResponseEntity<Student> registerUser(@RequestBody Student student) {
		return new ResponseEntity<Student>(dao.saveUser(student),HttpStatus.CREATED);
	}
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest data) {
		try{
		Authentication authenticate = manager.authenticate
		(new UsernamePasswordAuthenticationToken(data.getUserName(), data.getPassword()));
		UserDetails details = (UserDetails)authenticate.getPrincipal();
		Student user=dao.fetchUserByUserName(data.getUserName()).orElseThrow();
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
	
	@GetMapping("/byUsername/{userName}")
	public ResponseEntity<Student> getStudentByUserName(@PathVariable String userName) {
	    Student student = dao.fetchUserByUserName(userName).orElseThrow();
	    return new ResponseEntity<>(student, HttpStatus.OK);
	}
	
	@GetMapping("/studentdetails")
	public ResponseEntity<List<Student>> getAllStudent() {
		return new ResponseEntity<List<Student>>(dao.fetchAllStudents(),HttpStatus.OK);
	}
	
	@GetMapping("/studentdetails/{studentid}")
	public ResponseEntity<Student> getStudentByID(@PathVariable String studentid) {
		return new ResponseEntity<Student>(dao.getStudentByID(studentid),HttpStatus.OK);
	}
	
	@DeleteMapping("/deletestudent/{studentid}")
	public ResponseEntity<Student> deleteStudentByID(@PathVariable String studentid) {
		return new ResponseEntity<Student>(dao.deleteStudentByID(studentid),HttpStatus.OK);
	}
	
	@PutMapping("/updatestudent/{studentid}")
	public ResponseEntity<Student> updateStudentByID(@PathVariable String studentid, @RequestBody Student student) {
		return new ResponseEntity<Student>(dao.updateStudentByID(studentid,student),HttpStatus.OK);
	}
}
