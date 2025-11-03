package com.excelR.backend.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {
	@Id
    @GeneratedValue(generator = "custom-id-generator")
    @GenericGenerator(
        name = "custom-id-generator",
        strategy = "com.excelR.backend.generator.CustomIdGenerator"
    )
    @Column(name = "student_id")
    private String studentid;
	@Column(unique = true)
	private String userName;
	private String name, gender, password, school10th, puc12th, schoolPercentage, pucPercentage, 
	certificate10, certificatePuc, selectCourse,role;
	private int age;
	private long phone;
}
