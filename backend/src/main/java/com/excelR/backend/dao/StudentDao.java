package com.excelR.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.excelR.backend.exception.UserNotFoundException;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.StudentRepository;

@Repository
public class StudentDao {
	@Autowired
	PasswordEncoder password;
	@Autowired
	StudentRepository repo;
	@Autowired
	UserNotFoundException notFoundException;
	
	public Student saveUser(Student student) {
		student.setPassword(password.encode(student.getPassword()));
		return repo.save(student);
	}
	public Optional<Student> fetchUserByUserName(String userName) {
		return repo.findByUserName(userName);
	}
	
	public List<Student> fetchAllStudents(){
		return repo.findAll();
	}
	public Student getStudentByID(String id) {
		Optional<Student> db=repo.findById(id);
		if(db.isPresent()) {
			return db.get();
		}
		else {
			notFoundException.setMeassage("id "+id+" is not found to display");
			throw notFoundException;
		}
	}
	public Student deleteStudentByID(String studentid) {
		Optional<Student> db = repo.findById(studentid);
		if(db.isPresent()) {
			Student p =db.get();
			repo.delete(p);
			return p;
		}else {
			notFoundException.setMeassage("id "+studentid+" is not found to delete");
			throw notFoundException;
		}
	}
	
	public Student updateStudentByID(String studentid, Student updatedStudent) {
	    Optional<Student> db = repo.findById(studentid);
	    if (db.isPresent()) {
	        Student existingStudent = db.get();

	        existingStudent.setName(updatedStudent.getName());
	        existingStudent.setGender(updatedStudent.getGender());
	        existingStudent.setPassword(updatedStudent.getPassword());
	        existingStudent.setAge(updatedStudent.getAge());
	        existingStudent.setPhone(updatedStudent.getPhone());
	        existingStudent.setUserName(updatedStudent.getUserName());
	        existingStudent.setSchool10th(updatedStudent.getSchool10th());
	        existingStudent.setPuc12th(updatedStudent.getPuc12th());
	        existingStudent.setSchoolPercentage(updatedStudent.getSchoolPercentage());
	        existingStudent.setPucPercentage(updatedStudent.getPucPercentage());
	        existingStudent.setCertificate10(updatedStudent.getCertificate10());
	        existingStudent.setCertificatePuc(updatedStudent.getCertificatePuc());
	        existingStudent.setSelectCourse(updatedStudent.getSelectCourse());
	        existingStudent.setRole(updatedStudent.getRole());

	        repo.save(existingStudent);
	        return existingStudent;
	    } else {
	        notFoundException.setMeassage("Student ID " + studentid + " not found to update");
	        throw notFoundException;
	    }
	}

	
	
}
