package com.excelR.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.excelR.backend.dao.CourseDao;
import com.excelR.backend.model.Course;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
@RestController
@RequestMapping("/auth/course")
public class CourseController {
	@Autowired
	CourseDao dao;
	
	@PostMapping("/savecourse")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		return new ResponseEntity<Course>(dao.saveCourse(course),HttpStatus.CREATED);
	}
	
	@GetMapping("/coursedetails")
	public ResponseEntity<List<Course>> getAllCourse() {
		return new ResponseEntity<List<Course>>(dao.fetchAllCourse(),HttpStatus.OK);
	}
	
	@GetMapping("/coursedetails/{semester}")
	public ResponseEntity<List<Course>> getAllCourseBySemister(@PathVariable int semester) {
		return new ResponseEntity<List<Course>>(dao.fetchCourseBySemister(semester),HttpStatus.OK);
	}
	
	@DeleteMapping("/deletecourse/{courseid}")
	public ResponseEntity<Course> deleteCourseById(@PathVariable int courseid) {
		return new ResponseEntity<Course>(dao.deleteCourseById(courseid),HttpStatus.OK);
	}
	
	@PutMapping("/updatecourse/{courseid}")
	public ResponseEntity<Course> updateCourseById(@PathVariable int courseid, @RequestBody Course course) {
		return new ResponseEntity<Course>(dao.updateCourseByID(courseid, course),HttpStatus.OK);
	}
	
	
}
