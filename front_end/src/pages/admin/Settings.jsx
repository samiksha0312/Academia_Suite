import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    institutionName: "University College",
    email: "admin@college.edu",
    phone: "+1 (555) 123-4567",
    emailNotifications: true,
    autoEnrollment: false,
    studentSelfRegistration: true,
    academicYear: "2024-2025",
    semester: "Fall 2024",
    gradingScale: "A (90-100), B (80-89), C (70-79)...",
  });

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          {/* Header */}
          <div className="mb-4">
           <Button
  variant="light"
  className="mb-3 d-flex align-items-center"
  onClick={() => navigate("/admin/dashboard")}  // ✅ fixed route
>
  <span className="me-2">←</span>
  Back to Dashboard
</Button>

            <h2 className="fw-bold text-primary mb-2">Update Settings</h2>
            <p className="text-muted">
              System and configuration options for your institution.
            </p>
          </div>

          {/* General Settings */}
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">General Settings</Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Institution Name</Form.Label>
                <Form.Control
                  type="text"
                  value={settings.institutionName}
                  onChange={(e) =>
                    setSettings({ ...settings, institutionName: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contact Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* System Preferences */}
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">System Preferences</Card.Header>
            <Card.Body>
              <Form.Check
                type="switch"
                id="emailNotifications"
                label="Email Notifications"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: e.target.checked,
                  })
                }
              />

              <Form.Check
                type="switch"
                id="autoEnrollment"
                label="Auto Enrollment"
                checked={settings.autoEnrollment}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    autoEnrollment: e.target.checked,
                  })
                }
              />

              <Form.Check
                type="switch"
                id="studentSelfRegistration"
                label="Student Self-registration"
                checked={settings.studentSelfRegistration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    studentSelfRegistration: e.target.checked,
                  })
                }
              />
            </Card.Body>
          </Card>

          {/* Academic Settings */}
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Academic Settings</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Academic Year</Form.Label>
                    <Form.Control
                      type="text"
                      value={settings.academicYear}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          academicYear: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Semester</Form.Label>
                    <Form.Control
                      type="text"
                      value={settings.semester}
                      onChange={(e) =>
                        setSettings({ ...settings, semester: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>Grading Scale</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={settings.gradingScale}
                  onChange={(e) =>
                    setSettings({ ...settings, gradingScale: e.target.value })
                  }
                />
              </Form.Group>
            </Card.Body>
          </Card>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <Button variant="primary" onClick={handleSave}>
              💾 Save Changes
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
