package com.excelR.backend.dto;

import lombok.Data;

@Data
public class LoginResponse {
	private String role,userName,token;
}
