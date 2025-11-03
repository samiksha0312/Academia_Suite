import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaBook, FaCheckCircle } from "react-icons/fa";

function MyCourses() {
  const { userName } = useParams();
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch instructor's assigned courses
  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/auth/enrollment/byUserName/instructor/${userName}`
        );

        console.log("📦 Response Data:", res.data);

        // ✅ Ensure we always store an array in state
        const courses = Array.isArray(res.data)
          ? res.data
          : res.data.assignedCourses || [];

        setAssignedCourses(courses);
      } catch (error) {
        console.error("❌ Error fetching assigned courses:", error);
        setMessage("❌ Failed to load assigned courses");
      } finally {
        setLoading(false);
      }
    };

    if (userName) fetchAssignedCourses();
  }, [userName]);

  const handleGoToDashboard = () => {
    navigate("/instructor/dashboard");
  };

  const handleActivateCourse = (courseId) => {
    console.log("🔹 Activate course clicked for:", courseId);
    // Future logic for activation can go here (PATCH or PUT request)
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f8faff 0%, #eef3ff 100%)",
        minHeight: "100vh",
        paddingTop: "80px",
        position: "relative",
      }}
    >
      {/* 🔙 Go to Dashboard Button */}
      <Button
        variant="outline-primary"
        className="position-absolute top-0 start-0 m-4 rounded-pill fw-semibold d-flex align-items-center"
        onClick={handleGoToDashboard}
      >
        <FaArrowLeft className="me-2" />
        Go to Dashboard
      </Button>

      <Container className="mt-4">
        <h3
          className="text-center mb-4 fw-bold"
          style={{ color: "#2e3a59", fontSize: "2rem" }}
        >
          🎓 My Assigned Courses
        </h3>

        {message && (
          <Alert variant="danger" className="text-center fw-semibold">
            {message}
          </Alert>
        )}

        {Array.isArray(assignedCourses) && assignedCourses.length === 0 ? (
          <Alert
            variant="warning"
            className="text-center shadow-sm p-4 rounded-4 bg-light"
          >
            <h5 className="fw-semibold mb-3">
              You don’t have any assigned courses yet.
            </h5>
            <Button
              variant="primary"
              className="rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                border: "none",
              }}
              onClick={() => navigate("/instructor/my-courses")}
            >
              View Available Courses
            </Button>
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {Array.isArray(assignedCourses) &&
              assignedCourses.map((course) => (
                <Col key={course.id}>
                  <Card
                    className="shadow-lg border-0 h-100"
                    style={{
                      borderRadius: "20px",
                      transition:
                        "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-8px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0px)")
                    }
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            background:
                              "linear-gradient(135deg, rgba(110,142,251,0.15), rgba(167,119,227,0.15))",
                          }}
                        >
                          <FaBook size={22} color="#6e8efb" />
                        </div>
                        <div>
                          <Card.Title className="fw-bold mb-1 text-primary">
                            {course.courseName}
                          </Card.Title>
                          <Card.Subtitle className="text-muted small">
                            {course.courseCode} • Sem {course.semester}
                          </Card.Subtitle>
                        </div>
                      </div>

                      <Card.Text className="mt-3">
                        <strong>Department:</strong> {course.department} <br />
                        <strong>Credits:</strong> {course.credits} <br />
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            course.status === "Active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {course.status || "Pending"}
                        </span>
                      </Card.Text>

                      <div className="text-center mt-3">
                        {course.status === "Active" ? (
                          <Button
                            variant="success"
                            disabled
                            className="rounded-pill px-4 py-2 fw-semibold"
                          >
                            <FaCheckCircle className="me-2" />
                            Activated
                          </Button>
                        ) : (
                          <Button
                            variant="outline-primary"
                            className="rounded-pill px-4 py-2 fw-semibold"
                            onClick={() => handleActivateCourse(course.id)}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default MyCourses;
