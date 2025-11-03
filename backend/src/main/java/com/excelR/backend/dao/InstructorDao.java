package com.excelR.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.excelR.backend.exception.UserNotFoundException;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.repo.InstructorRepository;

@Repository
public class InstructorDao {
	@Autowired
	PasswordEncoder password;
	@Autowired
	InstructorRepository repo;
	@Autowired
	UserNotFoundException notFoundException;
	
	public Instructor saveUser(Instructor instructor) {
		instructor.setPassword(password.encode(instructor.getPassword()));
		return repo.save(instructor);
	}
	public Optional<Instructor> fetchUserByUserName(String userName) {
		return repo.findByUserName(userName);
	}
	
	public List<Instructor> fetchAllInstructors(){
		return repo.findAll();
	}
	public Instructor getInstructorByID(String id) {
		Optional<Instructor> db=repo.findById(id);
		if(db.isPresent()) {
			return db.get();
		}
		else {
			notFoundException.setMeassage("id "+id+" is not found to display");
			throw notFoundException;
		}
	}
	public Instructor deleteInstructorByID(String instructorid) {
		Optional<Instructor> db = repo.findById(instructorid);
		if(db.isPresent()) {
			Instructor p =db.get();
			repo.delete(p);
			return p;
		}else {
			notFoundException.setMeassage("id "+instructorid+" is not found to delete");
			throw notFoundException;
		}
	}
	
	public Instructor updateInstructorByID(String instructorid, Instructor updatedInstructor) {
	    Optional<Instructor> db = repo.findById(instructorid);
	    if (db.isPresent()) {
	        Instructor existingInstructor = db.get();

	        // Update only the fields that can change
	        existingInstructor.setName(updatedInstructor.getName());
	        existingInstructor.setGender(updatedInstructor.getGender());
	        existingInstructor.setDepartment(updatedInstructor.getDepartment());
	        existingInstructor.setPassword(updatedInstructor.getPassword());
	        existingInstructor.setDegree(updatedInstructor.getDegree());
	        existingInstructor.setSubject(updatedInstructor.getSubject());
	        existingInstructor.setRole(updatedInstructor.getRole());
	        existingInstructor.setAge(updatedInstructor.getAge());
	        existingInstructor.setExperiences(updatedInstructor.getExperiences());
	        existingInstructor.setPhone(updatedInstructor.getPhone());
	        existingInstructor.setUserName(updatedInstructor.getUserName());

	        // Save the updated instructor
	        repo.save(existingInstructor);
	        return existingInstructor;
	    } else {
	        notFoundException.setMeassage("Instructor ID " + instructorid + " not found to update");
	        throw notFoundException;
	    }
	}

	
}
