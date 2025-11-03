package com.excelR.backend.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.excelR.backend.model.Instructor;
import com.excelR.backend.repo.InstructorRepository;

@Repository
public class InstructorDao {
	@Autowired
	PasswordEncoder password;
	@Autowired
	InstructorRepository repo;
	
	public Instructor saveUser(Instructor instructor) {
		instructor.setPassword(password.encode(instructor.getPassword()));
		return repo.save(instructor);
	}
}
