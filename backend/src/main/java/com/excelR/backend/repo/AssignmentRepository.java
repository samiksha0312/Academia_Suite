package com.excelR.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.excelR.backend.model.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
	List<Assignment> findByCourse(String course);
	List<Assignment> findByType(String type);

}

