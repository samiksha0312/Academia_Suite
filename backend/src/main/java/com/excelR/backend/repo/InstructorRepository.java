package com.excelR.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
	Optional<Instructor> findByUserName(String email);
}
