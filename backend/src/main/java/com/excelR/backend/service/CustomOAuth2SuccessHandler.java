package com.excelR.backend.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.excelR.backend.model.Admin;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.AdminRepository;
import com.excelR.backend.repo.InstructorRepository;
import com.excelR.backend.repo.StudentRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private InstructorRepository instructorRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        if (email == null || email.isBlank()) {
            String login = oAuth2User.getAttribute("login");
            email = (login != null ? login : "unknown") + "@github.local";
            System.out.println("Email missing, using fallback: " + email);
        }
        Optional<Admin> adminOpt = adminRepo.findByUserName(email);
        Optional<Instructor> instructorOpt = instructorRepo.findByUserName(email);
        Optional<Student> studentOpt = studentRepo.findByUserName(email);

        String role;

        if (adminOpt.isPresent()) {
            role = "ADMIN";
        } else if (instructorOpt.isPresent()) {
            role = "INSTRUCTOR";
        } else if (studentOpt.isPresent()) {
            role = "STUDENT";
        } else {
            Student newStudent = new Student();
            newStudent.setUserName(email);
            newStudent.setPassword(" ");
            newStudent.setRole("STUDENT");
            studentRepo.save(newStudent);
            role = "STUDENT";
        }

        String token = jwtUtil.generateTokenFromEmail(email);

        System.out.println("OAuth2 login successful for: " + email + " | Role: " + role);
        System.out.println("Generated Token: " + token);

        response.sendRedirect("http://localhost:5173/oauth-success?token=" + token + "&role=" + role);
    }
}
