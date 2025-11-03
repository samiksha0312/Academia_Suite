package com.excelR.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Grades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ Many grades belong to one student
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    private Student student;

    // ✅ Many grades belong to one instructor
    @ManyToOne
    @JoinColumn(name = "instructor_id", referencedColumnName = "instructor_id")
    private Instructor instructor;

    private String subjectName;
    private String subjectCode;
    private int marks;
    private int obtainedMarks;
}
