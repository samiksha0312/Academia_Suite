package com.excelR.backend.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Instructor {
	@Id
    @GeneratedValue(generator = "custom-id-generator")
    @GenericGenerator(
        name = "custom-id-generator",
        strategy = "com.excelR.backend.generator.CustomIdGenerator"
    )
    @Column(name = "instructor_id")
    private String instructorid;
	@Column(unique = true)
	private String userName;
	private String name, gender, Department, password, degree, Subject, role;
	private int age, experiences;
	private long phone;
	
}
