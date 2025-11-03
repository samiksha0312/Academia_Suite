package com.excelR.backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.excelR.backend.model.Course;
import com.excelR.backend.model.Enrollment;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.CourseRepository;
import com.excelR.backend.repo.EnrollmentRepository;
import com.excelR.backend.repo.StudentRepository;

@Repository
public class EnrollmentDao {

    @Autowired
    private EnrollmentRepository repo;
    
    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;

    public Enrollment assignCourse(Enrollment enrollment) {
        return repo.save(enrollment);
    }

    public List<Enrollment> fetchCoursesByStudent(String studentId) {
        return repo.findByStudentStudentid(studentId);
    }

    public void removeEnrollment(String studentId, int courseId) {
        repo.deleteByStudent_StudentidAndCourse_Courseid(studentId, courseId);
    }

    public List<Enrollment> fetchAllEnrollments() {
        return repo.findAll();
    }
    
    public List<Enrollment> fetchCoursesByUserName(String userName) {
        return repo.findByStudent_UserName(userName);
    }
    
    public Enrollment assignCourseByUserName(String userName, int courseId) {
        // ✅ Find student by username
        Optional<Student> studentOpt = studentRepo.findByUserName(userName);
        if (studentOpt.isEmpty()) {
            throw new RuntimeException("Student not found with username: " + userName);
        }

        Student student = studentOpt.get();

        // ✅ Find course by ID
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        // ✅ Create new enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setStatus("Active");

        return repo.save(enrollment);
    }

}
