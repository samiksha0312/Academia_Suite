import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Tab, Nav, Form, Button, InputGroup } from "react-bootstrap";
import { FaEnvelope, FaLock, FaUserShield, FaTimes } from "react-icons/fa";

function LoginModal({ show, onHide }) {
  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSelect = (selectedRole) => setRole(selectedRole);

  const getHeaderIcon = () => <FaUserShield className="me-2" />;

  // ✅ Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `http://localhost:8080/api/login/${role.toLowerCase()}`;
      const response = await axios.post(endpoint, { email, password });

      if (response.status === 200) {
        alert(`${role} login successful!`);
        onHide();
        navigate("/about"); // 👈 redirect after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  // ✅ Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target.id === "custom-backdrop") {
      onHide();
      navigate("/about"); // 👈 redirect when clicking outside
    }
  };

  return (
    <>
      {/* Custom backdrop */}
      {show && (
        <div
          id="custom-backdrop"
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040,
          }}
        />
      )}

      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop={false}
        keyboard={true}
        style={{ zIndex: 1050 }}
      >
        {/* HEADER */}
        <div
          className="p-4 text-white d-flex justify-content-between align-items-start"
          style={{
            background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <div>
            <h4 className="fw-bold mb-1 d-flex align-items-center">
              {getHeaderIcon()} {role} Portal
            </h4>
            <p className="mb-0 small">
              Sign in to access your account and manage your academic activities.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              onHide();
              navigate("/about"); // 👈 navigate to About page when ❌ clicked
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* BODY */}
        <Modal.Body className="p-4">
          <Tab.Container activeKey={role} onSelect={handleSelect}>
            {/* ROLE TABS */}
            <Nav variant="pills" className="justify-content-center mb-3">
              {["Student", "Instructor", "Admin"].map((r) => (
                <Nav.Item key={r}>
                  <Nav.Link
                    eventKey={r}
                    className="px-4"
                    style={{
                      borderRadius: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {r}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey={role}>
                <Form onSubmit={handleLogin}>
                  {/* EMAIL */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder={`${role.toLowerCase()}@acadimica.edu`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* PASSWORD */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* REMEMBER ME */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                    <a
                      href="#"
                      className="text-decoration-none small text-primary"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* SIGN IN BUTTON */}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
                      border: "none",
                    }}
                  >
                    Sign In
                  </Button>

                  <p className="text-center mt-3 text-muted">
                    Don’t have an account?{" "}
                    <a href="#" className="text-decoration-none">
                      Contact Administration
                    </a>
                  </p>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
