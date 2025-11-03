package com.excelR.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelR.backend.model.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {
	List<Course>findBySemester(int semester); 
}
