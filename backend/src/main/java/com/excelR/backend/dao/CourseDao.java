package com.excelR.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.excelR.backend.exception.UserNotFoundException;
import com.excelR.backend.model.Course;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.CourseRepository;

@Repository
public class CourseDao {
	@Autowired
	CourseRepository repo;
	@Autowired
	UserNotFoundException notFoundException;
	
	public Course saveCourse(Course course) {
		return repo.save(course);
	}
	
	public List<Course> fetchAllCourse(){
		return repo.findAll();
	}
	
	public List<Course> fetchCourseBySemister(int semester){ 
		return repo.findBySemester(semester);
	}

	public Course deleteCourseById(int courseid) {
		Optional<Course> db = repo.findById(courseid);
		if(db.isPresent()) {
			Course p =db.get();
			repo.delete(p);
			return p;
		}else {
			notFoundException.setMeassage("id "+courseid+" is not found to delete");
			throw notFoundException;
		}
	}
	
	public Course updateCourseByID(int courseid, Course course) {
	    Optional<Course> db = repo.findById(courseid);
	    if (db.isPresent()) {
	        Course existingCourse = db.get();

	        existingCourse.setCourseName(course.getCourseName());
	        existingCourse.setCourseCode(course.getCourseCode());
	        existingCourse.setCredits(course.getCredits());
	        existingCourse.setDepartment(course.getDepartment());
	        existingCourse.setDescription(course.getDescription());
	        existingCourse.setSemester(course.getSemester());
	        existingCourse.setCapacity(course.getCapacity());

	        repo.save(existingCourse);
	        return existingCourse;
	    } else {
	        notFoundException.setMeassage("Grade ID " + courseid + " not found to update");
	        throw notFoundException;
	    }
	}



}
