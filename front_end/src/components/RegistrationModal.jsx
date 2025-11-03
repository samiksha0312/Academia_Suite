import React, { useState } from "react";
import { Modal, Tab, Nav, Form, Button, InputGroup } from "react-bootstrap";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaUserGraduate,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationModal({ show, onHide }) {
  const [tab, setTab] = useState("Student");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // ✅ Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle file uploads (to Cloudinary)
  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "unsigned_upload");
    uploadData.append("cloud_name", "dsbwkapof");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsbwkapof/image/upload",
        uploadData
      );
      const imageUrl = res.data.secure_url;
      setFormData((prev) => ({ ...prev, [name]: imageUrl }));
      console.log(`${name} uploaded:`, imageUrl);
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add role automatically based on tab
      const roleValue = tab.toLowerCase();
      const updatedData = { ...formData, role: roleValue };

      const endpoint = `http://localhost:8080/auth/${roleValue}/register`;

      const response = await axios.post(endpoint, updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(`${tab} registered successfully!`);
      onHide();
    } catch (err) {
      console.error("Registration error:", err.response || err.message);
      if (err.response?.status === 403) {
        alert("403 Forbidden: Check backend CORS or endpoint permissions.");
      } else if (err.response?.status === 400) {
        alert("Invalid data or user already exists.");
      } else {
        alert("Error during registration. Please try again.");
      }
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onHide();
    navigate("/login");
  };

  if (!show) return null;

  return (
    <>
      <div
        onClick={onHide}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      />

      <Modal
        show={show}
        onHide={onHide}
        centered
        backdrop={false}
        keyboard={true}
        style={{ zIndex: 1050 }}
      >
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
              <FaUserGraduate className="me-2" /> {tab} Registration
            </h4>
            <p className="mb-0">Register as {tab.toLowerCase()} to join Academia Suite.</p>
          </div>

          <button
            onClick={onHide}
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

        <Modal.Body className="p-4" onClick={(e) => e.stopPropagation()}>
          <Tab.Container activeKey={tab} onSelect={(selected) => setTab(selected)}>
            <Nav variant="pills" className="justify-content-center mb-3">
              {["Student", "Instructor", "Admin"].map((role) => (
                <Nav.Item key={role}>
                  <Nav.Link
                    eventKey={role}
                    className="px-4"
                    style={{ borderRadius: "20px", fontWeight: "500" }}
                  >
                    {role}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey={tab}>
                <Form onSubmit={handleSubmit}>
                  {/* Common Fields */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaEnvelope />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="userName"
                        placeholder="Enter email"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" onChange={handleChange} required>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaPhone />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Student Fields */}
                  {tab === "Student" && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>School (10th)</Form.Label>
                        <Form.Control
                          type="text"
                          name="school10th"
                          placeholder="Enter school name"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>PUC (12th)</Form.Label>
                        <Form.Control
                          type="text"
                          name="puc12th"
                          placeholder="Enter PUC/12th institution"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>School Percentage</Form.Label>
                        <Form.Control
                          type="text"
                          name="schoolPercentage"
                          placeholder="Enter 10th percentage"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>PUC Percentage</Form.Label>
                        <Form.Control
                          type="text"
                          name="pucPercentage"
                          placeholder="Enter 12th percentage"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>10th Certificate</Form.Label>
                        <Form.Control
                          type="file"
                          name="certificate10"
                          accept=".pdf,.jpg,.png"
                          onChange={handleFileUpload}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>PUC Certificate</Form.Label>
                        <Form.Control
                          type="file"
                          name="certificatePuc"
                          accept=".pdf,.jpg,.png"
                          onChange={handleFileUpload}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Selected Course</Form.Label>
                        <Form.Select name="selectCourse" onChange={handleChange} required>
                          <option value="">Select Course</option>
                          <option>B.Tech</option>
                          <option>MBA</option>
                          <option>B.Sc</option>
                          <option>M.Sc</option>
                          <option>BCA</option>
                          <option>MCA</option>
                          <option>Diploma</option>
                        </Form.Select>
                      </Form.Group>
                    </>
                  )}

                  {/* Instructor Fields */}
                  {tab === "Instructor" && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Department</Form.Label>
                        <Form.Select name="Department" onChange={handleChange} required>
                          <option value="">Select Department</option>
                          <option value="CSE">CSE</option>
                          <option value="Physics">Physics</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="Civil">Civil</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                          type="text"
                          name="degree"
                          placeholder="Enter degree"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          name="Subject"
                          placeholder="Enter subject specialization"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Experience (years)</Form.Label>
                        <Form.Control
                          type="number"
                          name="experiences"
                          placeholder="Enter years of experience"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  )}

                  {/* Admin Fields */}
                  {tab === "Admin" && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                          type="text"
                          name="degree"
                          placeholder="Enter degree"
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Experience (years)</Form.Label>
                        <Form.Control
                          type="number"
                          name="experiences"
                          placeholder="Enter years of experience"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  )}

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mt-2"
                    style={{
                      background: "linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)",
                      border: "none",
                    }}
                  >
                    Register
                  </Button>

                  <p className="text-center mt-3 text-muted">
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-decoration-none text-primary"
                      onClick={handleLoginClick}
                    >
                      Login here
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

export default RegistrationModal;
