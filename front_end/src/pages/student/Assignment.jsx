import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AssignmentReceive = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/assignment/all");
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to fetch assignments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const handleGoToDashboard = () => {
    setShowModal(true);
  };

  const confirmNavigation = () => {
    setShowModal(false);
    navigate("/student/dashboard");
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error)
    return (
      <Alert variant="danger" className="mt-4 text-center">
        {error}
      </Alert>
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
      {/* 🔙 Go to Dashboard Button (Top-Left Corner) */}
      <Button
        variant="primary"
        className="position-absolute top-0 start-0 m-4 rounded-pill px-4 py-2 fw-semibold"
        style={{
          background: "linear-gradient(135deg, #6e8efb, #a777e3)",
          border: "none",
        }}
        onClick={handleGoToDashboard}
      >
        Go to Dashboard
      </Button>

      {/* 📚 Centered Assignment Section */}
      <Container
        className="py-4 d-flex flex-column align-items-center justify-content-center"
        style={{ textAlign: "center" }}
      >
        <h2 className="text-primary mb-4 fw-bold">📚 Assignments</h2>

        {assignments.length === 0 ? (
          <p className="text-center">No assignments available right now.</p>
        ) : (
          <Row className="justify-content-center">
            {assignments.map((assignment) => (
              <Col key={assignment.id} md={6} lg={4} className="mb-4">
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <Card.Title className="fw-semibold">
                      {assignment.title}
                    </Card.Title>
                    <Card.Text className="text-start">
                      <strong>Course:</strong> {assignment.course} <br />
                      <strong>Due Date:</strong> {assignment.dueDate} <br />
                      <strong>Points:</strong> {assignment.totalPoints} <br />
                      <strong>Type:</strong> {assignment.type || "N/A"} <br />
                      <strong>Description:</strong>{" "}
                      {assignment.description || "No description."}
                    </Card.Text>

                    {assignment.fileName && (
                      <Button
                        variant="success"
                        href={`http://localhost:8080/auth/assignment/${assignment.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📂 Download {assignment.fileName}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* ✅ Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Navigation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to go to the Dashboard?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{
              background: "linear-gradient(135deg, #6e8efb, #a777e3)",
              border: "none",
            }}
            onClick={confirmNavigation}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AssignmentReceive;
