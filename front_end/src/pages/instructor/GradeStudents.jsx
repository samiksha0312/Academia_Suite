import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AssignGrades = () => {
  const [students, setStudents] = useState([]);
  const [instructor, setInstructor] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchId, setSearchId] = useState(""); // Search input

  const navigate = useNavigate();

  // ✅ Fetch all students and instructor details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, instructorRes] = await Promise.all([
          axios.get("http://localhost:8080/auth/student/studentdetails"),
          axios.get("http://localhost:8080/auth/instructor/instructordetails"),
        ]);

        // ✅ Handle student data
        if (Array.isArray(studentRes.data)) {
          setStudents(studentRes.data);
          setGrades(
            studentRes.data.map((stu) => ({
              studentId: stu.studentid,
              name: stu.name,
              subjectName: "",
              subjectCode: "",
              marks: "",
              obtainedMarks: "",
            }))
          );
        } else {
          setStudents([]);
          setError("No students found for grading.");
        }

        // ✅ Handle instructor data (fix for undefined issue)
        if (Array.isArray(instructorRes.data) && instructorRes.data.length > 0) {
          setInstructor(instructorRes.data[0]); // take the first instructor
        } else if (instructorRes.data) {
          setInstructor(instructorRes.data);
        } else {
          setError("Instructor data not found.");
        }

        console.log("✅ Instructor loaded:", instructorRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load student/instructor details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Search student by ID
  const handleSearch = async () => {
    if (!searchId) {
      setError("Please enter a Student ID to search.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.get(
        `http://localhost:8080/auth/student/studentdetails/${searchId}`
      );

      const student = res.data;
      if (student && student.studentid) {
        setStudents([student]);
        setGrades([
          {
            studentId: student.studentid,
            name: student.name,
            subjectName: "",
            subjectCode: "",
            marks: "",
            obtainedMarks: "",
          },
        ]);
        setSuccess(`✅ Student ${student.name} found successfully!`);
      } else {
        setError("No student found with that ID.");
      }
    } catch (err) {
      console.error("Error fetching student:", err);
      setError("❌ Failed to find student. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update grades dynamically
  const handleGradeChange = (index, field, value) => {
    const updatedGrades = [...grades];
    updatedGrades[index][field] = value;
    setGrades(updatedGrades);
  };

  // ✅ Submit grades to backend
  const handleSubmitAll = async () => {
    if (!instructor || !instructor.instructorid) {
      setError("Instructor details missing — please reload the page.");
      return;
    }

    if (!grades || grades.length === 0) {
      setError("No student grades to submit.");
      return;
    }

    if (!window.confirm("Are you sure you want to submit all grades?")) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      for (const g of grades) {
        console.log("Submitting grade for:", g.studentId, "Instructor:", instructor.instructorid);
        await axios.post(
          `http://localhost:8080/auth/instructor/grades/add/${g.studentId}/${instructor.instructorid}`,
          {
            subjectName: g.subjectName,
            subjectCode: g.subjectCode,
            marks: g.marks,
            obtainedMarks: g.obtainedMarks,
          }
        );
      }
      setSuccess("✅ All grades submitted successfully!");
    } catch (err) {
      console.error("Error submitting grades:", err);
      setError("❌ Failed to submit grades. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading data...</p>
      </div>
    );

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="fw-bold text-primary">Assign Grades</h2>
          {instructor && (
            <p className="text-muted">
              Instructor: <strong>{instructor.name}</strong> (
              {instructor.instructorid})
            </p>
          )}
        </Col>
        <Col className="text-end">
          <Button
            variant="secondary"
            onClick={() => navigate("/instructor-dashboard")}
          >
            Go to Dashboard
          </Button>
        </Col>
      </Row>

      {/* ✅ Search Student Section */}
      <Card className="p-3 mb-4">
        <Row>
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Enter Student ID to Search"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Button variant="info" onClick={handleSearch}>
              Search Student
            </Button>
          </Col>
        </Row>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="shadow-sm p-3">
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No students found.
                </td>
              </tr>
            ) : (
              grades.map((g, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{g.studentId}</td>
                  <td>{g.name}</td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Subject Name"
                      value={g.subjectName}
                      onChange={(e) =>
                        handleGradeChange(i, "subjectName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Subject Code"
                      value={g.subjectCode}
                      onChange={(e) =>
                        handleGradeChange(i, "subjectCode", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Total Marks"
                      value={g.marks}
                      onChange={(e) =>
                        handleGradeChange(i, "marks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Obtained Marks"
                      value={g.obtainedMarks}
                      onChange={(e) =>
                        handleGradeChange(i, "obtainedMarks", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {grades.length > 0 && (
          <div className="text-end">
            <Button
              variant="primary"
              onClick={handleSubmitAll}
              disabled={saving}
              className="mt-2"
            >
              {saving ? "Submitting..." : "Submit All Grades"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default AssignGrades;
