package com.excelR.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.excelR.backend.dao.EnrollmentDao;
import com.excelR.backend.dao.InstructorEnrollmentDao;
import com.excelR.backend.model.Enrollment;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.InstructorEnrollment;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.EnrollmentRepository;
import com.excelR.backend.repo.InstructorEnrollmentRepository;
import com.excelR.backend.repo.InstructorRepository;
import com.excelR.backend.repo.StudentRepository;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})

@RestController
@RequestMapping("/auth/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentDao dao;
    @Autowired
    private StudentRepository studentRepo;
    @Autowired
    private EnrollmentRepository enrollmentRepo;
    @Autowired
    private InstructorRepository instructorRepo;
    @Autowired
    private InstructorEnrollmentRepository insRepo;
    @Autowired
    private InstructorEnrollmentDao insDao;

    // ✅ Admin assigns a course to a student
    @PostMapping("/assign")
    public ResponseEntity<Enrollment> assignCourse(@RequestBody Enrollment enrollment) {
        return new ResponseEntity<>(dao.assignCourse(enrollment), HttpStatus.CREATED);
    }

    // ✅ Remove enrollment
    @DeleteMapping("/remove/{studentId}/{courseId}")
    public ResponseEntity<String> removeEnrollment(@PathVariable String studentId, @PathVariable int courseId) {
        dao.removeEnrollment(studentId, courseId);
        return ResponseEntity.ok("Enrollment removed successfully");
    }

    // ✅ Get all enrollments (optional)
    @GetMapping("/all")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return new ResponseEntity<>(dao.fetchAllEnrollments(), HttpStatus.OK);
    }
    @GetMapping("/byUserName/student/{userName}")
    public ResponseEntity<?> getEnrollmentstudentByUserName(@PathVariable String userName) {
        Optional<Student> student = studentRepo.findByUserName(userName);
        if (student.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found");
        }
        List<Enrollment> enrollments = enrollmentRepo.findByStudent(student.get());
        return ResponseEntity.ok(enrollments);
    }
    @GetMapping("/byUserName/instructor/{userName}")
    public ResponseEntity<?> getEnrollmentinstructorByUserName(@PathVariable String userName) {
        Optional<Instructor> instructor = instructorRepo.findByUserName(userName);
        if (instructor.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Istructor not found");
        }
        List<InstructorEnrollment> enrollments = insRepo.findByInstructor(instructor.get());
        return ResponseEntity.ok(enrollments);
    }

    
    @PostMapping("/assign/student/byUserName")
    public ResponseEntity<?> assignCourseStudentByUserName(@RequestBody Map<String, Object> request) {
        try {
            String userName = (String) request.get("userName");
            Object courseIdObj = request.get("courseId");

            if (userName == null || courseIdObj == null) {
                return ResponseEntity.badRequest().body("Missing userName or courseId");
            }

            int courseId;
            if (courseIdObj instanceof Integer) {
                courseId = (Integer) courseIdObj;
            } else if (courseIdObj instanceof String) {
                courseId = Integer.parseInt((String) courseIdObj);
            } else {
                return ResponseEntity.badRequest().body("Invalid courseId type");
            }

            Enrollment enrollment = dao.assignCourseByUserName(userName, courseId);
            return ResponseEntity.status(HttpStatus.CREATED).body(enrollment);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning course: " + e.getMessage());
        }

    }
    
    @PostMapping("/assign/instructor/byUserName")
    public ResponseEntity<?> assignCourseInstructorByUserName(@RequestBody Map<String, Object> request) {
        try {
            String userName = (String) request.get("userName");
            Object courseIdObj = request.get("courseId");

            if (userName == null || courseIdObj == null) {
                return ResponseEntity.badRequest().body("Missing userName or courseId");
            }

            int courseId;
            if (courseIdObj instanceof Integer) {
                courseId = (Integer) courseIdObj;
            } else if (courseIdObj instanceof String) {
                courseId = Integer.parseInt((String) courseIdObj);
            } else {
                return ResponseEntity.badRequest().body("Invalid courseId type");
            }

            InstructorEnrollment enrollment = insDao.assignCourseByUserName(userName, courseId);
            return ResponseEntity.status(HttpStatus.CREATED).body(enrollment);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning course: " + e.getMessage());
        }

    }



}
