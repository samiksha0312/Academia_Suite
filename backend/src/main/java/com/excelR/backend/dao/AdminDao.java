package com.excelR.backend.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.excelR.backend.model.Admin;
import com.excelR.backend.repo.AdminRepository;

@Repository
public class AdminDao {
	
	@Autowired
	PasswordEncoder password;
	@Autowired
	AdminRepository repo;
	
	
	public Admin saveUser(Admin admin) {
		admin.setPassword(password.encode(admin.getPassword()));
		return repo.save(admin);
	}
	
	public Optional<Admin> fetchUserByUserName(String userName) {
		return repo.findByUserName(userName);
	}
	
	
}
