import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch student data by ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/auth/student/studentdetails/${id}`
        );
        setStudent(res.data);
      } catch (err) {
        alert("Failed to load student data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // ✅ Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/auth/student/updatestudent/${id}`,
        student
      );
      alert("✅ Student updated successfully!");
      navigate("/admin/manage-users");
    } catch (err) {
      alert("❌ Failed to update student");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!student) return <p className="text-center mt-5">Student not found.</p>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg rounded-4">
        <h3 className="text-center text-primary mb-4">Update Student</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              value={student.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name="userName"
              value={student.userName || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              name="selectCourse"
              value={student.selectCourse || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={student.phone || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>10th Percentage</Form.Label>
            <Form.Control
              name="schoolPercentage"
              value={student.schoolPercentage || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>12th Percentage</Form.Label>
            <Form.Control
              name="pucPercentage"
              value={student.pucPercentage || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="me-3"
              onClick={() => navigate("/admin/manage")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                border: "none",
              }}
            >
              💾 Update Student
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default UpdateStudent;
