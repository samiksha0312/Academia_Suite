package com.excelR.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, String> {
	Optional<Instructor> findByUserName(String email);
	Optional<Instructor> findByInstructorid(String instructorid);
	List<Instructor> deleteInstructorByinstructorid(String instructorid);
}
