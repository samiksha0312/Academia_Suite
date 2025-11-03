package com.excelR.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	@Column(unique = true)
	private String userName;
	private String name, gender, password, school10th, puc12th, schoolPercentage, pucPercentage, 
	certificate10, certificatePuc, selectCourse;
	private int age;
	private long phone;
}
