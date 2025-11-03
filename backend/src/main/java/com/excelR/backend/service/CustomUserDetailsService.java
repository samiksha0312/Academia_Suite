package com.excelR.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.excelR.backend.model.Admin;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.AdminRepository;
import com.excelR.backend.repo.InstructorRepository;
import com.excelR.backend.repo.StudentRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepo;
    
    @Autowired
    private StudentRepository studentRepo;
    
    @Autowired
    private InstructorRepository instructorRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	// 1️⃣ Check in Admin table
        Optional<Admin> admin = adminRepo.findByUserName(username);
        if (admin.isPresent()) {
            Admin a = admin.get();
            return User.builder()
                    .username(a.getUserName())
                    .password(a.getPassword())
                    .roles(a.getRole()) // ROLE_ADMIN
                    .build();
        }

        // 2️⃣ Check in Instructor table
        Optional<Instructor> instructor = instructorRepo.findByUserName(username);
        if (instructor.isPresent()) {
            Instructor i = instructor.get();
            return User.builder()
                    .username(i.getUserName())
                    .password(i.getPassword())
                    .roles(i.getRole()) // ROLE_INSTRUCTOR
                    .build();
        }

        // 3️⃣ Check in Student table
        Optional<Student> student = studentRepo.findByUserName(username);
        if (student.isPresent()) {
            Student s = student.get();
            return User.builder()
                    .username(s.getUserName())
                    .password(s.getPassword())
                    .roles(s.getRole()) // ROLE_STUDENT
                    .build();
        }

        // ❌ No match found
        throw new UsernameNotFoundException("User not found with username: " + username);
        
        
    }
}
