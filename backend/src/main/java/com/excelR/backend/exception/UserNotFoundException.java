package com.excelR.backend.exception;

import org.springframework.stereotype.Component;

@Component
public class UserNotFoundException extends RuntimeException {
	private String meassage="not found";

	public String getMeassage() {
		return meassage;
	}

	public void setMeassage(String meassage) {
		this.meassage = meassage;
	}
}
