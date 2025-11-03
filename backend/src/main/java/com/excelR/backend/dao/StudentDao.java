package com.excelR.backend.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.excelR.backend.model.Student;
import com.excelR.backend.repo.StudentRepository;

@Repository
public class StudentDao {
	@Autowired
	PasswordEncoder password;
	@Autowired
	StudentRepository repo;
	
	public Student saveUser(Student student) {
		student.setPassword(password.encode(student.getPassword()));
		return repo.save(student);
	}
}
