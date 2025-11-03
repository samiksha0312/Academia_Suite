import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Container, Form, Row, Col, Spinner, Alert } from "react-bootstrap";

function UpdateCourse() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch Course by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/course/coursedetails");
        const course = res.data.find((c) => c.courseid == id || c.id == id);
        if (course) setFormData(course);
        else setError("Course not found");
      } catch (err) {
        console.error(err);
        setError("Error fetching course details");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // ✅ Update Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/auth/course/updatecourse/${id}`, formData);
      alert("✅ Course updated successfully!");
      navigate("/admin/manage-users");
    } catch (error) {
      console.error("❌ Error updating course:", error);
      alert("Error updating course. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading course details...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="text-center mt-5">
        {error}
      </Alert>
    );

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
            onClick={() => navigate("/admin/manageuser")}
          >
            <span className="me-2">←</span>
            Back to Manage Page
          </Button>

          <h1 className="fw-bold text-primary">Update Course</h1>
          <p className="text-muted fs-6">Modify details of the selected course.</p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 rounded-4 p-4 mb-5 bg-white">
          <Card.Body>
            <h4 className="fw-semibold mb-3 text-primary border-bottom pb-2">
              Course Information
            </h4>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="courseName">
                    <Form.Label className="fw-semibold">Course Name</Form.Label>
                    <Form.Control
                      type="text"
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
                    <Form.Label className="fw-semibold">Course Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.courseCode}
                      onChange={(e) =>
                        setFormData({ ...formData, courseCode: e.target.value })
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="credits">
                    <Form.Label className="fw-semibold">Credits</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.credits || ""}
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
                      value={formData.department || ""}
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
                      value={formData.semester || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, semester: e.target.value })
                      }
                    >
                      <option value="">-- Select Semester --</option>
                      {[1,2,3,4,5,6,7,8].map((sem) => (
                        <option key={sem} value={sem}>{sem}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="instructor">
                    <Form.Label className="fw-semibold">Instructor</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.instructor || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="capacity">
                    <Form.Label className="fw-semibold">Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.capacity || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-3 mt-4">
                <Button
                  type="submit"
                  className="px-4 shadow-sm"
                  style={{
                    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                    border: "none",
                  }}
                >
                  ✅ Update Course
                </Button>
                <Button
                  variant="outline-secondary"
                  className="px-4"
                  onClick={() => navigate("/admin/manageuser")}
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

export default UpdateCourse;
