package com.excelR.backend.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.excelR.backend.model.Admin;
import com.excelR.backend.model.Instructor;
import com.excelR.backend.model.Student;
import com.excelR.backend.repo.AdminRepository;
import com.excelR.backend.repo.InstructorRepository;
import com.excelR.backend.repo.StudentRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private InstructorRepository instructorRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");

        if (email == null || email.isBlank()) {
            String login = (String) attributes.get("login");
            email = login + "@github.local";
        }
        Optional<Admin> adminOpt = adminRepo.findByUserName(email);
        Optional<Instructor> instructorOpt = instructorRepo.findByUserName(email);
        Optional<Student> studentOpt = studentRepo.findByUserName(email);
        if (adminOpt.isPresent() || instructorOpt.isPresent() || studentOpt.isPresent()) {
            return oAuth2User;
        }
        if (email.endsWith("@admin.com")) {
            Admin newAdmin = new Admin();
            newAdmin.setUserName(email);
            newAdmin.setPassword(" ");
            newAdmin.setRole("ADMIN");
            adminRepo.save(newAdmin);
        } else if (email.endsWith("@instructor.com")) {
            Instructor newInstructor = new Instructor();
            newInstructor.setUserName(email);
            newInstructor.setPassword(" ");
            newInstructor.setRole("INSTRUCTOR");
            instructorRepo.save(newInstructor);
        } else {
            Student newStudent = new Student();
            newStudent.setUserName(email);
            newStudent.setPassword(" ");
            newStudent.setRole("STUDENT");
            studentRepo.save(newStudent);
        }

        return oAuth2User;
    }
}
