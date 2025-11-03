import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBook,
  FaUser,
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
  FaSmile,
} from "react-icons/fa";

function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Use userName from localStorage
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!userName) {
      console.warn("⚠️ No username found — redirecting to login.");
      navigate("/");
      return;
    }

    const fetchCourses = async () => {
      try {
        // ✅ Same endpoint as Enroll.jsx
        const res = await axios.get(
          `http://localhost:8080/auth/enrollment/byUserName/student/${userName}`
        );

        console.log("✅ Enrolled Courses Response:", res.data);

        // ✅ Extract course objects from enrollment list
        const courses = Array.isArray(res.data)
          ? res.data.map((enroll) => enroll.course)
          : [];

        setEnrolledCourses(courses);
      } catch (err) {
        console.error("❌ Error fetching enrolled courses:", err);
        setError("Failed to load enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userName, navigate]);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const handleConfirmLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowLogoutModal(false);
    navigate("/");
  };

  const features = [
    {
      title: "Enrolled Course",
      desc: "Register for new courses",
      path: `/student/enroll/${userName}`,
      icon: <FaBook size={28} color="#6e8efb" />,
    },
    {
      title: "My Profile",
      desc: "View your information",
      path: "/student/profile",
      icon: <FaUser size={28} color="#6e8efb" />,
    },
    {
      title: "View Courses",
      desc: "Browse available courses",
      path: "/student/course",
      icon: <FaBook size={28} color="#6e8efb" />,
    },
    {
      title: "View Grades",
      desc: "Check your performance",
      path: "/student/grades",
      icon: <FaChartBar size={28} color="#6e8efb" />,
    },
    {
      title: "Assignments",
      desc: "View and submit assignments",
      path: "/student/assignment",
      icon: <FaFileAlt size={28} color="#6e8efb" />,
    },
  ];

  return (
    <div
      style={{
        background: "#f8faff",
        minHeight: "100vh",
        position: "relative",
        paddingTop: "80px",
      }}
    >
      {/* ✅ Logout Button */}
      <Button
        onClick={handleLogoutClick}
        className="rounded-pill px-4 py-2 fw-semibold position-absolute"
        style={{
          top: "20px",
          right: "20px",
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          border: "none",
          color: "#fff",
        }}
      >
        <FaSignOutAlt className="me-2" />
        Logout
      </Button>

      <Container className="text-center">
        <h1 className="fw-bold mb-2" style={{ color: "#2e3a59" }}>
          Welcome,{" "}
          <span style={{ color: "#6e8efb" }}>
            {userName ? userName : "Student"}
          </span>
        </h1>
        <p className="text-muted fs-5 mb-5">
          Track your academic progress and manage your activities.
        </p>

        {/* ✅ Feature Cards */}
        <Row className="g-4 justify-content-center mb-5">
          {features.map((item, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card
                className="border-0 shadow-sm text-center p-3 h-100"
                style={{
                  borderRadius: "18px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                <Card.Body>
                  <div
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      background:
                        "linear-gradient(135deg, rgba(110,142,251,0.1), rgba(167,119,227,0.15))",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h5 className="fw-semibold mb-2">{item.title}</h5>
                  <p className="text-muted mb-3">{item.desc}</p>
                  <Button
                    className="rounded-pill px-4 border-0"
                    style={{
                      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                      color: "#fff",
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    Open
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ✅ Enrolled Courses Section */}
        <div className="mt-4 mb-5 text-start">
          <h4 className="fw-bold mb-3" style={{ color: "#2e3a59" }}>
            Enrolled Courses
          </h4>

          <Card className="border-0 shadow-sm rounded-4 p-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : enrolledCourses.length === 0 ? (
              <div className="text-center py-4">
                <FaSmile size={50} color="#6e8efb" className="mb-3" />
                <h5 className="fw-semibold" style={{ color: "#6e8efb" }}>
                  No courses enrolled yet
                </h5>
                <p className="text-muted mb-3">
                  Once you enroll in courses, they’ll appear here.
                </p>
                <Button
                  className="rounded-pill px-4 border-0"
                  style={{
                    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                    color: "#fff",
                  }}
                  onClick={() => navigate(`/student/enroll/${userName}`)}
                >
                  Enroll Now
                </Button>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.id || course.courseCode}
                  className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom"
                >
                  <div>
                    <h6 className="mb-1 fw-semibold text-primary">
                      {course.courseName} ({course.courseCode})
                    </h6>
                    <p className="text-muted mb-0 small">
                      Department: {course.department || "N/A"} | Semester:{" "}
                      {course.semester}
                    </p>
                  </div>
                  <span className="badge bg-success">Enrolled</span>
                </div>
              ))
            )}
          </Card>
        </div>
      </Container>

      {/* ✅ Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="mb-4">Are you sure you want to go to the Home Page?</p>
          <Button
            onClick={handleConfirmLogout}
            className="rounded-pill px-4 border-0"
            style={{
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              color: "#fff",
            }}
          >
            Go to Home Page
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default StudentDashboard;
