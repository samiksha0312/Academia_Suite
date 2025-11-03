package com.excelR.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.excelR.backend.model.Enrollment;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
	List<Enrollment> findByStudentStudentid(String studentid);
	void deleteByStudent_StudentidAndCourse_Courseid(String studentid, int courseid);
	List<Enrollment> findByStudent_UserName(String userName);
	List<Enrollment> findByStudent(Student student);

}
