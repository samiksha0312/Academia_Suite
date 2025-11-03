package com.excelR.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelR.backend.dao.GradesDAO;
import com.excelR.backend.model.Grades;
import com.excelR.backend.repo.GradesRepository;

@RestController
@RequestMapping("/auth/instructor/grades")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
public class GradesController {

    @Autowired
    private GradesDAO gradesDAO;
    @Autowired
    private GradesRepository repo;

    @PostMapping("/add/{studentId}/{instructorId}")
    public Grades addGrade(@PathVariable String studentId, @PathVariable String instructorId,
                           @RequestBody Grades grade) {
        return gradesDAO.addGrade(studentId, instructorId, grade);
    }

    @GetMapping("/all")
    public List<Grades> getAllGrades() {
        return gradesDAO.getAllGrades();
    }
    @GetMapping("{username}")
    public ResponseEntity<List<Grades>> getGradesByStudentUsername(@PathVariable String username) {
        List<Grades> grades = repo.findByStudentUserName(username);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/student/{studentId}")
    public List<Grades> getGradesByStudent(@PathVariable String studentId) {
        return gradesDAO.getGradesByStudent(studentId);
    }
    
    @GetMapping("/instructor/{instructorId}")
    public List<Grades> getGradesByInstructor(@PathVariable String instructorId) {
        return gradesDAO.getGradesByInstructor(instructorId);
    }
}
