import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentGrades = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Use correct key (matches LoginModal: "userName")
  const username =
    localStorage.getItem("userName") || sessionStorage.getItem("userName");

  useEffect(() => {
    if (!username) {
      setError("No username found. Please log in again.");
      return;
    }

    // ✅ Fetch grades for this specific student
    axios
      .get(`http://localhost:8080/auth/instructor/grades/${username}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setGrades(response.data);
        } else {
          setError("No grades found for this student.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load grades. Please try again later.");
      });
  }, [username]);

  const handleDashboard = () => navigate("/student/dashboard");

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <h2 className="text-center text-primary fw-bold mb-4">
        🎓 My Grade Report
      </h2>

      {/* ⚙️ Dashboard Button */}
      <div className="d-flex justify-content-center mb-4">
        <button onClick={handleDashboard} className="btn btn-success">
          Go to Dashboard
        </button>
      </div>

      {error && <p className="text-danger text-center fw-bold">{error}</p>}

      {/* 🧾 Grades Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead style={{ backgroundColor: "#cfe2ff" }}>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((g, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{g.student?.studentid ?? "N/A"}</td>
                  <td>{g.student?.name ?? "N/A"}</td>
                  <td>{g.subjectName ?? "N/A"}</td>
                  <td>{g.subjectCode ?? "N/A"}</td>
                  <td>{g.marks ?? "N/A"}</td>
                  <td>{g.obtainedMarks ?? "N/A"}</td>
                  <td>{g.instructor?.name ?? "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-muted py-3">
                  No grades available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
