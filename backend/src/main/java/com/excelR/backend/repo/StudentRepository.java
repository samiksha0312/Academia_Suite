package com.excelR.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByUserName(String email);
}
