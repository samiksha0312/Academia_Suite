package com.excelR.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, String> {
	Optional<Student> findByUserName(String userName);
	Optional<Student> findByStudentid(String studentid);
}
