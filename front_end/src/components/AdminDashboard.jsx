import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  // ✅ Card Data with Navigation Paths
  const features = [
    {
      title: "Manage Users",
      desc: "Add, edit, or remove users.",
      path: "/admin/manage-users",
    },
    {
      title: "Add New Course",
      desc: "Create and configure new courses.",
      path: "/admin/add-course",
    },
    {
      title: "Update Settings",
      desc: "System and configuration options.",
      path: "/admin/settings",
    },
    {
      title: "View Reports",
      desc: "Analytics and performance tracking.",
      path: "/admin/reports",
    },
  ];

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", position: "relative" }}>
      {/* ✅ Top-right Logout Button */}
      <Button
        onClick={handleLogoutClick}
        className="rounded-pill px-4 py-2 fw-semibold position-absolute"
        style={{
          top: "20px",
          right: "30px",
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        Logout
      </Button>

      {/* ✅ Dashboard Content */}
      <Container className="text-center" style={{ paddingTop: "60px" }}>
        <h1 className="fw-bold mb-2">
          Welcome,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #4e73df, #6e8efb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Administrator
          </span>
        </h1>
        <p className="text-muted fs-5 mb-5">
          Manage your institution’s academic operations efficiently.
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
                  cursor: "pointer",
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
                    <i
                      className="bi bi-gear fs-3"
                      style={{ color: "#6e8efb" }}
                    ></i>
                  </div>
                  <h5 className="fw-semibold mb-2">{item.title}</h5>
                  <p className="text-muted mb-3">{item.desc}</p>
                  <Button
                    variant="light"
                    className="rounded-pill px-4"
                    style={{
                      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
                      color: "#fff",
                      border: "none",
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

        {/* ✅ Stats Section */}
        <Row className="g-4 justify-content-center mb-5">
          <Col xs={12} sm={6} lg={4}>
            <Card className="border-0 shadow-sm text-center p-4 rounded-4">
              <h5 className="fw-bold">Total Students</h5>
              <h3 className="fw-bold" style={{ color: "#6e8efb" }}>
                1,247
              </h3>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Card className="border-0 shadow-sm text-center p-4 rounded-4">
              <h5 className="fw-bold">Active Courses</h5>
              <h3 className="fw-bold" style={{ color: "#6e8efb" }}>
                84
              </h3>
            </Card>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Card className="border-0 shadow-sm text-center p-4 rounded-4">
              <h5 className="fw-bold">Instructors</h5>
              <h3 className="fw-bold" style={{ color: "#6e8efb" }}>
                52
              </h3>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* ✅ Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="mb-4">Do you want to go to the Home Page?</p>
          <Button
            variant="light"
            onClick={handleConfirmLogout}
            style={{
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              color: "#fff",
              border: "none",
              borderRadius: "25px",
              padding: "6px 25px",
            }}
          >
            Go to Home Page
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
