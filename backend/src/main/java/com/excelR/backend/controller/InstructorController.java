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

import com.excelR.backend.dao.InstructorDao;
import com.excelR.backend.dto.LoginRequest;
import com.excelR.backend.dto.LoginResponse;
import com.excelR.backend.model.Course;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;
import com.excelR.backend.service.JwtUtil;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
@RestController
@RequestMapping("/auth/instructor")
public class InstructorController {
	@Autowired
	InstructorDao dao;
	
	@Autowired
	JwtUtil util;
	
	@Autowired
	AuthenticationManager manager;
	
	@PostMapping("/register")
	public ResponseEntity<Instructor> registerUser(@RequestBody Instructor instructor) {
		return new ResponseEntity<Instructor>(dao.saveUser(instructor),HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest data) {
		try{
		Authentication authenticate = manager.authenticate
		(new UsernamePasswordAuthenticationToken(data.getUserName(), data.getPassword()));
		UserDetails details = (UserDetails)authenticate.getPrincipal();
		Instructor user=dao.fetchUserByUserName(data.getUserName()).orElseThrow();
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
	public ResponseEntity<Instructor> getInstructorByUserName(@PathVariable String userName) {
	    Instructor instructor = dao.fetchUserByUserName(userName).orElseThrow();
	    return new ResponseEntity<>(instructor, HttpStatus.OK);
	}
	
	@GetMapping("/instructordetails")
	public ResponseEntity<List<Instructor>> getAllInstructor() {
		return new ResponseEntity<List<Instructor>>(dao.fetchAllInstructors(),HttpStatus.OK);
	}
	
	@GetMapping("/instructordetails/{instructorid}")
	public ResponseEntity<Instructor> getInstructorByID(@PathVariable String instructorid) {
		return new ResponseEntity<Instructor>(dao.getInstructorByID(instructorid),HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteinstructor/{instructorid}")
	public ResponseEntity<Instructor> deleteInstructorByID(@PathVariable String instructorid) {
		return new ResponseEntity<Instructor>(dao.deleteInstructorByID(instructorid),HttpStatus.OK);
	}
	
	@PutMapping("/updateinstructor/{instructorid}")
	public ResponseEntity<Instructor> updateInstructorByID(@PathVariable String instructorid, @RequestBody Instructor updatedInstructor) {
		return new ResponseEntity<Instructor>(dao.updateInstructorByID(instructorid,updatedInstructor),HttpStatus.OK);
	}
}
