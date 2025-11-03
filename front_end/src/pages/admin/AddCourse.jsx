import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    description: "",
    credits: "",
    department: "",
    semester: "",
    instructor: "",
    capacity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.courseName.trim() || !formData.courseCode.trim()) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/course/savecourse",
        formData
      );

      if (response.status === 200 || response.status === 201) {
        alert("✅ Course created successfully!");
        setFormData({
          courseName: "",
          courseCode: "",
          description: "",
          credits: "",
          department: "",
          semester: "",
          capacity: "",
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("❌ Error saving course:", error);
      alert("Error saving course. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f1f3f6",
        minHeight: "100vh",
        paddingTop: "60px",
      }}
    >
      <Container>
        {/* Header */}
        <div className="mb-4 text-center">
          <Button
            variant="light"
            className="mb-3 d-flex align-items-center"
            onClick={() => navigate("/admin/dashboard")}
          >
            <span className="me-2">←</span>
            Back to Dashboard
          </Button>

          <h1 className="fw-bold text-primary">Add New Course</h1>
          <p className="text-muted fs-6">
            Fill in the details to create a new course for the semester.
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 rounded-4 p-4 mb-5 bg-white">
          <Card.Body>
            <h4 className="fw-semibold mb-3 text-primary border-bottom pb-2">
              Course Information
            </h4>

            <Form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="courseName">
                    <Form.Label className="fw-semibold">
                      Course Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Introduction to Computer Science"
                      value={formData.courseName}
                      onChange={(e) =>
                        setFormData({ ...formData, courseName: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="courseCode">
                    <Form.Label className="fw-semibold">
                      Course Code <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., CS101"
                      value={formData.courseCode}
                      onChange={(e) =>
                        setFormData({ ...formData, courseCode: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Description */}
              <Form.Group controlId="description" className="mb-3">
                <Form.Label className="fw-semibold">
                  Course Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Provide a detailed description of the course..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>

              {/* Row 2 */}
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="credits">
                    <Form.Label className="fw-semibold">Credits</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="3"
                      value={formData.credits}
                      onChange={(e) =>
                        setFormData({ ...formData, credits: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="department">
                    <Form.Label className="fw-semibold">Department</Form.Label>
                    <Form.Select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                    >
                      <option value="">-- Select Department --</option>
                      <option value="CSE">Computer Science</option>
                      <option value="ECE">Electronics</option>
                      <option value="EEE">Electrical</option>
                      <option value="MECH">Mechanical</option>
                      <option value="CIVIL">Civil</option>
                      <option value="MATHS">Mathematics</option>
                      <option value="PHYSICS">Physics</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="semester">
                    <Form.Label className="fw-semibold">Semester</Form.Label>
                    <Form.Select
                      value={formData.semester}
                      onChange={(e) =>
                        setFormData({ ...formData, semester: e.target.value })
                      }
                    >
                      <option value="">-- Select Semester --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              {/* Row 3 */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="capacity">
                    <Form.Label className="fw-semibold">
                      Maximum Capacity
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="30"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Buttons */}
              <div className="d-flex justify-content-end gap-3 mt-4">
                <Button
                  type="submit"
                  className="d-flex align-items-center px-4 shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                    border: "none",
                  }}
                >
                  💾 Save Course
                </Button>
                <Button
                  variant="outline-secondary"
                  className="px-4"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddCourse;
