package com.excelR.backend.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.excelR.backend.model.Grades;

public interface GradesRepository extends JpaRepository<Grades, Long> {

    // Find grades by student
    List<Grades> findByStudent_studentid(String studentid);

    // Find grades by instructor
    List<Grades> findByInstructor_instructorid(String instructorid);
    
    List<Grades> findByStudentUserName(@Param("username") String username);
}
