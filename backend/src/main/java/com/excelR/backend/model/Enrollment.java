package com.excelR.backend.model;

import java.util.Optional;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int enrollmentId;

    // Each enrollment is linked to a Student
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id") // fix: use property name (studentid)
    private Student student;

    // Each enrollment is linked to a Course
    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "courseid") // fix: use actual Course PK name
    private Course course;

    private String status;
}
