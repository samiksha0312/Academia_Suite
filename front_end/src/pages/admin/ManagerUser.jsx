import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Card,
  Button,
  Nav,
  Tab,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ManageUser() {
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInstructor, setSearchInstructor] = useState("");
  const [searchStudent, setSearchStudent] = useState("");
  const [searchSemester, setSearchSemester] = useState("");

  // ✅ Fetch all data from backend
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [instRes, stuRes, courseRes] = await Promise.all([
        axios.get("http://localhost:8080/auth/instructor/instructordetails"),
        axios.get("http://localhost:8080/auth/student/studentdetails"),
        axios.get("http://localhost:8080/auth/course/coursedetails"),
      ]);
      setInstructors(instRes.data || []);
      setStudents(stuRes.data || []);
      setCourses(courseRes.data || []);
      setError("");
    } catch (err) {
      console.error("❌ Error fetching data:", err);
      setError("Failed to load data. Please check backend connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 🔍 Search Handlers
  const handleSearchInstructor = async () => {
    if (!searchInstructor.trim()) return fetchAllData();
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/instructor/instructordetails/${searchInstructor}`
      );
      setInstructors([res.data]);
      setError("");
    } catch (err) {
      console.error(err);
      setInstructors([]);
      setError("No instructor found with this ID.");
    }
  };

  const handleSearchStudent = async () => {
    if (!searchStudent.trim()) return fetchAllData();
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/student/studentdetails/${searchStudent}`
      );
      setStudents([res.data]);
      setError("");
    } catch (err) {
      console.error(err);
      setStudents([]);
      setError("No student found with this ID.");
    }
  };

  const handleSearchCourse = async () => {
    if (!searchSemester.trim()) return fetchAllData();
    try {
      const res = await axios.get(
        `http://localhost:8080/auth/course/coursedetails/${searchSemester}`
      );
      setCourses(Array.isArray(res.data) ? res.data : [res.data]);
      setError("");
    } catch (err) {
      console.error(err);
      setCourses([]);
      setError("No course found for this semester.");
    }
  };

  // 🗑️ Delete Handlers
  const handleDeleteInstructor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;
    try {
      await axios.delete(`http://localhost:8080/auth/instructor/deleteinstructor/${id}`);
      alert("✅ Instructor deleted successfully!");
      fetchAllData();
    } catch (err) {
      console.error("❌ Delete instructor error:", err);
      alert("Failed to delete instructor. Make sure no assigned courses exist.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:8080/auth/student/deletestudent/${id}`);
      alert("✅ Student deleted successfully!");
      fetchAllData();
    } catch (err) {
      console.error("❌ Delete student error:", err);
      alert("Failed to delete student. They might have enrollments assigned.");
    }
  };

  const handleDeleteCourse = async (courseid) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/auth/course/deletecourse/${courseid}`);
      alert("✅ Course deleted successfully!");
      fetchAllData();
    } catch (err) {
      console.error("❌ Delete course error:", err);
      alert("Failed to delete course. Check enrollments before deleting.");
    }
  };

  // ✏️ Navigate to Update or Assign Course Pages
  const handleUpdate = (type, id) => {
    navigate(`/admin/update/${type}/${id}`);
  };

  const handleAssignCourse = (type, username) => {
    if (!username) {
      alert("❌ Username missing. Please check user data.");
      return;
    }
    if (type === "instructor") {
      navigate(`/admin/assign-course/instructor/${encodeURIComponent(username)}`);
    } else if (type === "student") {
      navigate(`/admin/assign-course/student/${encodeURIComponent(username)}`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8faff, #eef1fb)",
        padding: "60px 0",
      }}
    >
      <Container>
        <Button
          variant="light"
          className="mb-4"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </Button>

        <Card className="shadow-lg border-0 rounded-4 p-4 bg-white">
          <h3 className="text-center text-primary mb-4">Manage Platform Data</h3>

          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Tab.Container defaultActiveKey="instructors">
              <Nav variant="tabs" className="justify-content-center mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="instructors">👨‍🏫 Instructors</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="students">🎓 Students</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="courses">📚 Courses</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* 🔹 Instructors */}
                <Tab.Pane eventKey="instructors">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Instructor by ID"
                      value={searchInstructor}
                      onChange={(e) => setSearchInstructor(e.target.value)}
                    />
                    <Button onClick={handleSearchInstructor}>Search</Button>
                  </InputGroup>

                  <Table striped bordered hover responsive>
                    <thead className="table-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Degree</th>
                        <th>Subject</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructors.length > 0 ? (
                        instructors.map((i) => (
                          <tr key={i.instructorid}>
                            <td>{i.instructorid}</td>
                            <td>{i.name}</td>
                            <td>{i.userName}</td>
                            <td>{i.department}</td>
                            <td>{i.degree}</td>
                            <td>{i.subject}</td>
                            <td>{i.phone}</td>
                            <td>{i.role}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleUpdate("instructor", i.instructorid)}
                                className="me-2"
                              >
                                Update
                              </Button>
                              <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => handleAssignCourse("instructor", i.userName)}
                              >
                                Assign Course
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteInstructor(i.instructorid)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center text-muted">
                            No instructors found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Tab.Pane>

                {/* 🔹 Students */}
                <Tab.Pane eventKey="students">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Student by ID"
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                    />
                    <Button onClick={handleSearchStudent}>Search</Button>
                  </InputGroup>

                  <Table striped bordered hover responsive>
                    <thead className="table-success">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Course</th>
                        <th>Phone</th>
                        <th>10th %</th>
                        <th>12th %</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.length > 0 ? (
                        students.map((s) => (
                          <tr key={s.studentid}>
                            <td>{s.studentid}</td>
                            <td>{s.name}</td>
                            <td>{s.userName}</td>
                            <td>{s.selectCourse}</td>
                            <td>{s.phone}</td>
                            <td>{s.schoolPercentage}</td>
                            <td>{s.pucPercentage}</td>
                            <td>{s.role}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleUpdate("student", s.studentid)}
                                className="me-2"
                              >
                                Update
                              </Button>
                              <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => handleAssignCourse("student", s.userName)}
                              >
                                Assign Course
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteStudent(s.studentid)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center text-muted">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Tab.Pane>

                {/* 🔹 Courses */}
                <Tab.Pane eventKey="courses">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search Course by Semester"
                      value={searchSemester}
                      onChange={(e) => setSearchSemester(e.target.value)}
                    />
                    <Button onClick={handleSearchCourse}>Search</Button>
                  </InputGroup>

                  <Table striped bordered hover responsive>
                    <thead className="table-info">
                      <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Course Code</th>
                        <th>Department</th>
                        <th>Credits</th>
                        <th>Semester</th>
                        <th>Capacity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((c) => (
                          <tr key={c.courseid}>
                            <td>{c.courseid}</td>
                            <td>{c.courseName}</td>
                            <td>{c.courseCode}</td>
                            <td>{c.department}</td>
                            <td>{c.credits}</td>
                            <td>{c.semester}</td>
                            <td>{c.capacity}</td>
                            <td>
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handleUpdate("course", c.courseid)}
                                className="me-2"
                              >
                                Update
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteCourse(c.courseid)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center text-muted">
                            No courses found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          )}
        </Card>
      </Container>
    </div>
  );
}

export default ManageUser;
