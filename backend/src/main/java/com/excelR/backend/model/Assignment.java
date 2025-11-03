package com.excelR.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title,course;
    @Column(length = 1000)
    private String description;
    private LocalDate dueDate;
    private int totalPoints;
    private String type, fileName;     
    private String fileType, fileDownloadUri; 
    @Lob
    private byte[] fileData; 

    
}
