import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [student, setStudent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      axios
        .get(`http://localhost:8080/auth/student/studentdetails`)
        .then((res) => {
          const found = res.data.find((s) => s.userName === userName);
          if (found) setStudent(found);
        })
        .catch((err) => console.error("Error fetching student details", err));
    }
  }, [userName]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8080/auth/student/updatestudent/${student.studentid}`,
        student
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
          onClick={() => navigate("/student/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>

      <Card className="shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center mb-4">My Profile</h2>

        <Form>
          <div className="row">
            {/* Student ID */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control value={student.studentid || ""} disabled />
            </Form.Group>

            {/* Username */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={student.userName || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Name */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={student.name || ""}
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
                value={student.gender || ""}
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
                value={student.age || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={student.phone || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* 10th School */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>10th School Name</Form.Label>
              <Form.Control
                type="text"
                name="school10th"
                value={student.school10th || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* 10th Percentage */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>10th Percentage</Form.Label>
              <Form.Control
                type="text"
                name="schoolPercentage"
                value={student.schoolPercentage || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* 12th College */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>12th / PUC College</Form.Label>
              <Form.Control
                type="text"
                name="puc12th"
                value={student.puc12th || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* 12th Percentage */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>12th Percentage</Form.Label>
              <Form.Control
                type="text"
                name="pucPercentage"
                value={student.pucPercentage || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Certificates */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>10th Certificate</Form.Label>
              <Form.Control
                type="text"
                name="certificate10"
                value={student.certificate10 || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>PUC Certificate</Form.Label>
              <Form.Control
                type="text"
                name="certificatePuc"
                value={student.certificatePuc || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Course */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Selected Course</Form.Label>
              <Form.Control
                type="text"
                name="selectCourse"
                value={student.selectCourse || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Role */}
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={student.role || ""}
                disabled
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

export default Profile;
