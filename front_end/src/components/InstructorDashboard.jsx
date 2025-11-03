import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBook,
  FaUser,
  FaClipboardList,
  FaChartBar,
  FaSignOutAlt,
  FaSmile,
} from "react-icons/fa";

function InstructorDashboard() {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (!userName) {
      console.warn("⚠️ No username found — redirecting to login.");
      navigate("/");
      return;
    }

    const fetchCourses = async () => {
      try {
        // 🔹 Updated endpoint to match MyCourses
        const res = await axios.get(
          `http://localhost:8080/auth/enrollment/byUserName/instructor/${userName}`
        );

        console.log("📦 Dashboard Course Data:", res.data);

        // 🔹 Ensure consistent array handling like MyCourses
        const courses = Array.isArray(res.data)
          ? res.data
          : res.data.assignedCourses || [];

        setAssignedCourses(courses);
      } catch (err) {
        console.error("❌ Error loading assigned courses:", err);
        setError("Failed to load assigned courses.");
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
      title: "My Courses",
      desc: "View and manage your assigned courses",
      path: `/instructor/my-courses/${userName}`,
      icon: <FaBook size={28} color="#6e8efb" />,
    },
    {
      title: "Create Assignment",
      desc: "Design assignments for students",
      path: "/instructor/create-assignment",
      icon: <FaClipboardList size={28} color="#6e8efb" />,
    },
    {
      title: "Grade Students",
      desc: "Assign and review grades",
      path: "/instructor/grade-students",
      icon: <FaChartBar size={28} color="#6e8efb" />,
    },
    {
      title: "My Profile",
      desc: "Update your personal info",
      path: "/instructor/profile",
      icon: <FaUser size={28} color="#6e8efb" />,
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
            {userName ? userName : "Instructor"}
          </span>
        </h1>
        <p className="text-muted fs-5 mb-5">
          Manage your courses, assignments, and student progress efficiently.
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

        {/* ✅ Assigned Courses Section (now same as MyCourses) */}
        <div className="mt-4 mb-5 text-start">
          <h4 className="fw-bold mb-3" style={{ color: "#2e3a59" }}>
            Assigned Courses
          </h4>

          <Card className="border-0 shadow-sm rounded-4 p-4">
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : assignedCourses.length === 0 ? (
              <div className="text-center py-4">
                <FaSmile size={50} color="#6e8efb" className="mb-3" />
                <h5 className="fw-semibold" style={{ color: "#6e8efb" }}>
                  No courses assigned yet
                </h5>
                <p className="text-muted mb-3">
                  Once you are assigned courses, they’ll appear here.
                </p>
              </div>
            ) : (
              assignedCourses.map((course) => (
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
                  <span
                    className={`badge ${
                      course.status === "Active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {course.status || "Pending"}
                  </span>
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

export default InstructorDashboard;
