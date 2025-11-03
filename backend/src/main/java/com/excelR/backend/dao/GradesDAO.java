package com.excelR.backend.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.excelR.backend.model.Grades;
import com.excelR.backend.model.Student;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.repo.GradesRepository;
import com.excelR.backend.repo.StudentRepository;
import com.excelR.backend.repo.InstructorRepository;

@Repository
public class GradesDAO {

    @Autowired
    private GradesRepository gradesRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private InstructorRepository instructorRepo;

    public Grades addGrade(String studentId, String instructorId, Grades grade) {
        Student student = studentRepo.findByStudentid(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Instructor instructor = instructorRepo.findByInstructorid(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        grade.setStudent(student);
        grade.setInstructor(instructor);

        return gradesRepo.save(grade);
    }

    public List<Grades> getAllGrades() {
        return gradesRepo.findAll();
    }

    public List<Grades> getGradesByStudent(String studentId) {
        return gradesRepo.findByStudent_studentid(studentId);
    }

    public List<Grades> getGradesByInstructor(String instructorId) {
        return gradesRepo.findByInstructor_instructorid(instructorId);
    }
}
