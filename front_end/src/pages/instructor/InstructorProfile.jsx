import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      axios
        .get(`http://localhost:8080/auth/instructor/instructordetails`)
        .then((res) => {
          const found = res.data.find((inst) => inst.userName === userName);
          if (found) setInstructor(found);
        })
        .catch((err) => console.error("Error fetching instructor details", err));
    }
  }, [userName]);

  const handleChange = (e) => {
    setInstructor({ ...instructor, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8080/auth/instructors/updateinstructor/${instructor.instructorid}`,
        instructor
      )
      .then(() => {
        alert("✅ Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating profile", err);
        alert("❌ Failed to update profile");
      });
  };

  return (
    <div className="container mt-4">
      <div className="mb-4 d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate("/instructor/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <Card className="shadow-lg p-4 border-0 rounded-4">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <FaChalkboardTeacher size={28} className="me-2 text-primary" />
          <h2 className="text-center mb-0">Instructor Profile</h2>
        </div>

        <Form>
          <div className="row">
            {/* Instructor ID */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Instructor ID</Form.Label>
              <Form.Control value={instructor.instructorid || ""} disabled />
            </Form.Group>

            {/* Full Name */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={instructor.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Username / Email */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Email / Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={instructor.userName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Gender */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={instructor.gender || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Age */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={instructor.age || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={instructor.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Department */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={instructor.department || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Degree */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={instructor.degree || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Subject */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={instructor.subject || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Experience */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control
                type="number"
                name="experiences"
                value={instructor.experiences || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </div>

          <div className="text-center mt-4">
            {!isEditing ? (
              <Button variant="primary" onClick={handleEdit}>
                ✏️ Edit Profile
              </Button>
            ) : (
              <Button variant="success" onClick={handleSave}>
                💾 Save Changes
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default InstructorProfile;
