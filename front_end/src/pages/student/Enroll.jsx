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

function Enroll() {
  const { userName } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/auth/enrollment/byUserName/student/${userName}`
        );
        setEnrollments(res.data);
      } catch (error) {
        console.error("❌ Error fetching enrollments:", error);
        setMessage("❌ Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    if (userName) fetchEnrollments();
  }, [userName]);

  // ✅ Enroll in a course
  const handleEnroll = async (courseId) => {
    try {
      const payload = {
        userName: userName,
        courseId: courseId,
        status: "Active",
      };

      console.log("📡 Sending enrollment:", payload);

      await axios.post("http://localhost:8080/auth/enrollment/add", payload);
      alert("✅ Successfully Enrolled!");

      // ✅ Update state instantly (no reload)
      setEnrollments((prev) =>
        prev.map((enroll) =>
          enroll.course.id === courseId
            ? { ...enroll, status: "Active", enrolled: true }
            : enroll
        )
      );
    } catch (error) {
      console.error("❌ Enrollment failed:", error);
      alert("❌ Enrollment failed. Please try again!");
    }
  };

  const handleGoToDashboard = () => {
    navigate("/student/dashboard");
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
          📘 My Enrolled Courses
        </h3>

        {message && (
          <Alert variant="danger" className="text-center fw-semibold">
            {message}
          </Alert>
        )}

        {enrollments.length === 0 ? (
          <Alert
            variant="warning"
            className="text-center shadow-sm p-4 rounded-4 bg-light"
          >
            <h5 className="fw-semibold mb-3">
              You are not enrolled in any courses yet.
            </h5>
            <Button
              variant="primary"
              className="rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{
                background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                border: "none",
              }}
              onClick={() => navigate("/student/course")}
            >
              Enroll Now
            </Button>
          </Alert>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {enrollments.map((enroll) => (
              <Col key={enroll.id}>
                <Card
                  className="shadow-lg border-0 h-100"
                  style={{
                    borderRadius: "20px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                          {enroll.course.courseName}
                        </Card.Title>
                        <Card.Subtitle className="text-muted small">
                          {enroll.course.courseCode} • Sem{" "}
                          {enroll.course.semester}
                        </Card.Subtitle>
                      </div>
                    </div>

                    <Card.Text className="mt-3">
                      <strong>Department:</strong> {enroll.course.department}{" "}
                      <br />
                      <strong>Credits:</strong> {enroll.course.credits} <br />
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          enroll.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {enroll.status || "Pending"}
                      </span>
                    </Card.Text>

                    <div className="text-center mt-3">
                      {enroll.status === "Active" ? (
                        <Button
                          variant="success"
                          disabled
                          className="rounded-pill px-4 py-2 fw-semibold"
                        >
                          <FaCheckCircle className="me-2" />
                          Enrolled
                        </Button>
                      ) : (
                        <Button
                          variant="outline-primary"
                          className="rounded-pill px-4 py-2 fw-semibold"
                          onClick={() => handleEnroll(enroll.course.id)}
                        >
                          Enroll
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

export default Enroll;
