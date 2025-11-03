import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Container } from "react-bootstrap";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    description: "",
    dueDate: "",
    totalPoints: "",
    type: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:8080/auth/assignment", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Assignment created successfully!");
      navigate("/instructor/dashboard");
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("❌ Failed to create assignment");
    }
  };

  return (
    <Container className="py-4">
      <Button
        variant="outline-secondary"
        onClick={() => navigate("/instructor/dashboard")}
      >
        ← Back
      </Button>

      <Card className="shadow-sm p-4 mt-3 mx-auto" style={{ maxWidth: "700px" }}>
        <h3 className="text-center fw-bold mb-3">Create Assignment</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course *</Form.Label>
            <Form.Select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select course</option>
              <option value="CS 101">CS 101 - Intro to Computer Science</option>
              <option value="CS 301">CS 301 - Database Systems</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Homework">Homework</option>
              <option value="Project">Project</option>
              <option value="Quiz">Quiz</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date *</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Points *</Form.Label>
            <Form.Control
              type="number"
              name="totalPoints"
              value={formData.totalPoints}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button type="submit" variant="primary">
              Create
            </Button>
            <Button variant="secondary" onClick={() => navigate("/instructor")}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateAssignment;
