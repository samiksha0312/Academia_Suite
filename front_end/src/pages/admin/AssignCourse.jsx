import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AssignCourse() {
  const { userName } = useParams(); // ✅ Get userName from route param
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [semesterFilter, setSemesterFilter] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Redirect if no userName in route
  useEffect(() => {
    if (!userName) {
      console.warn("⚠️ No userName found — redirecting to login.");
      navigate("/login");
    }
  }, [userName, navigate]);

  // ✅ Fetch all available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/auth/course/coursedetails"
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setMessage("❌ Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ✅ Toggle course selection
  const handleSelectCourse = (courseId) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // ✅ Filter by semester
  const filteredCourses = semesterFilter
    ? courses.filter((c) => c.semester?.toString() === semesterFilter)
    : courses;

  // ✅ Assign selected courses
  const handleAssignMultiple = async () => {
    if (selectedCourses.length === 0) {
      setMessage("⚠️ Please select at least one course.");
      return;
    }

    try {
      await Promise.all(
        selectedCourses.map(async (courseId) => {
          const payload = {
            userName: String(userName),
            courseId: Number(courseId),
            status: "Active",
          };
          console.log("📤 Sending payload:", payload);
          console.log("Payload being sent:", {
  userName: userName,
  courseId: Number(courseId),
  status: "Active",
});

          return axios.post(
            "http://localhost:8080/auth/enrollment/assign/student/byUserName ",
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        })
      );

      setMessage("✅ Courses assigned successfully!");
      setSelectedCourses([]);
    } catch (err) {
      console.error("Error assigning courses:", err);
      if (err.response) {
        setMessage(
          `❌ Failed to assign courses: ${err.response.data || "Server error"}`
        );
      } else {
        setMessage("❌ Failed to assign courses — Network error.");
      }
    }
  };

  return (
    <Container className="mt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        ← Back
      </Button>

      <h3 className="text-center mb-3">
        Assign Courses to Student{" "}
        <span className="text-primary">(User: {userName || "N/A"})</span>
      </h3>

      {/* Message Alert */}
      {message && (
        <Alert
          variant={
            message.includes("✅")
              ? "success"
              : message.includes("⚠️")
              ? "warning"
              : "danger"
          }
          className="text-center"
        >
          {message}
        </Alert>
      )}

      {/* Loading spinner */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <p>Loading courses...</p>
        </div>
      ) : (
        <>
          {/* Semester Filter */}
          <Form.Group className="mb-3">
            <Form.Label>Filter by Semester</Form.Label>
            <Form.Select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="">All Semesters</option>
              {[...new Set(courses.map((c) => c.semester))].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Course Cards */}
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredCourses.map((c) => (
              <Col key={c.courseid || c.id}>
                <Card
                  className={`shadow-sm h-100 border ${
                    selectedCourses.includes(c.courseid || c.id)
                      ? "border-success"
                      : ""
                  }`}
                >
                  <Card.Body>
                    <Card.Title>{c.courseName}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      {c.courseCode} • Sem {c.semester}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Department:</strong> {c.department} <br />
                      <strong>Credits:</strong> {c.credits} <br />
                      <strong>Capacity:</strong> {c.capacity}
                    </Card.Text>
                    <Button
                      variant={
                        selectedCourses.includes(c.courseid || c.id)
                          ? "danger"
                          : "primary"
                      }
                      onClick={() =>
                        handleSelectCourse(c.courseid || c.id)
                      }
                    >
                      {selectedCourses.includes(c.courseid || c.id)
                        ? "Remove"
                        : "Select"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Assign Button */}
          <div className="text-center mt-4">
            <Button variant="success" onClick={handleAssignMultiple}>
              ✅ Assign Selected Courses
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default AssignCourse;
