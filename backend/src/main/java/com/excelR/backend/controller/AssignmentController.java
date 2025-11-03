package com.excelR.backend.controller;

import com.excelR.backend.model.Assignment;
import com.excelR.backend.repo.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth/assignment")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.PUT})
public class AssignmentController {

    @Autowired
    private AssignmentRepository assignmentRepo;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAssignment(
            @RequestParam String title,
            @RequestParam String course,
            @RequestParam(required = false) String description,
            @RequestParam String dueDate,
            @RequestParam int totalPoints,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) MultipartFile file
    ) {
        try {
            Assignment assignment = new Assignment();
            assignment.setTitle(title);
            assignment.setCourse(course);
            assignment.setDescription(description);
            assignment.setDueDate(LocalDate.parse(dueDate));
            assignment.setTotalPoints(totalPoints);
            assignment.setType(type);

            if (file != null && !file.isEmpty()) {
                assignment.setFileName(file.getOriginalFilename());
                assignment.setFileType(file.getContentType());
                assignment.setFileData(file.getBytes());
            }

            assignmentRepo.save(assignment);
            return ResponseEntity.ok("Assignment created successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error while uploading file: " + e.getMessage());
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllAssignments() {
        List<Assignment> assignments = assignmentRepo.findAll();
        List<Map<String, Object>> simplified = new ArrayList<>();

        for (Assignment a : assignments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", a.getId());
            map.put("title", a.getTitle());
            map.put("course", a.getCourse());
            map.put("description", a.getDescription());
            map.put("dueDate", a.getDueDate());
            map.put("totalPoints", a.getTotalPoints());
            map.put("type", a.getType());
            map.put("fileName", a.getFileName());
            map.put("fileType", a.getFileType());
            simplified.add(map);
        }

        return ResponseEntity.ok(simplified);
    }

    // ✅ GET — Fetch Assignment by ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadAssignmentFile(@PathVariable Long id) {
        Optional<Assignment> opt = assignmentRepo.findById(id);
        if (opt.isEmpty() || opt.get().getFileData() == null) {
            return ResponseEntity.notFound().build();
        }

        Assignment a = opt.get();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(a.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + a.getFileName() + "\"")
                .body(a.getFileData());
    }
}
