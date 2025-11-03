import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";

function UpdateInstructor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch instructor data by ID
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/auth/instructor/instructordetails/${id}`
        );
        setInstructor(res.data);
      } catch (err) {
        alert("Failed to load instructor data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructor();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  // ✅ Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/auth/instructor/updateinstructor/${id}`,
        instructor
      );
      alert("✅ Instructor updated successfully!");
      navigate("/admin/manage-users");
    } catch (err) {
      alert("❌ Failed to update instructor");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!instructor)
    return <p className="text-center mt-5">Instructor not found.</p>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg rounded-4">
        <h3 className="text-center text-primary mb-4">Update Instructor</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              name="name"
              value={instructor.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name="userName"
              value={instructor.userName || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              name="department"
              value={instructor.department || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              name="degree"
              value={instructor.degree || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              name="subject"
              value={instructor.subject || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phone"
              value={instructor.phone || ""}
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
              💾 Update Instructor
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default UpdateInstructor;
