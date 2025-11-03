package com.excelR.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.excelR.backend.model.Course;
import com.excelR.backend.model.Enrollment;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.InstructorEnrollment;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.CourseRepository;
import com.excelR.backend.repo.InstructorEnrollmentRepository;
import com.excelR.backend.repo.InstructorRepository;

@Repository
public class InstructorEnrollmentDao {
	@Autowired
	private InstructorEnrollmentRepository repo;
	@Autowired
	private InstructorRepository instructorRepo;
	@Autowired
	private CourseRepository courseRepo;
	
	public List<InstructorEnrollment> fetchCoursesByUserName(String userName) {
        return repo.findByInstructor_UserName(userName);
    }
	
	public InstructorEnrollment assignCourseByUserName(String userName, int courseId) {
        // ✅ Find student by username
        Optional<Instructor> instructorOpt = instructorRepo.findByUserName(userName);
        if (instructorOpt.isEmpty()) {
            throw new RuntimeException("Student not found with username: " + userName);
        }

        Instructor instructor = instructorOpt.get();

        // ✅ Find course by ID
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        // ✅ Create new enrollment
        InstructorEnrollment enrollment = new InstructorEnrollment();
        enrollment.setInstructor(instructor);
        enrollment.setCourse(course);
        enrollment.setStatus("Active");

        return repo.save(enrollment);
    }
}
