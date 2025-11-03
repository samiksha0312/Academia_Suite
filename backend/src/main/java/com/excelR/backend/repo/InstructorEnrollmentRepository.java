package com.excelR.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Enrollment;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.InstructorEnrollment;

public interface InstructorEnrollmentRepository extends JpaRepository<InstructorEnrollment, Integer> {
	List<InstructorEnrollment> findByInstructor(Instructor instructor);
	List<InstructorEnrollment> findByInstructor_UserName(String userName);
}
