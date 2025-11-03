import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const [grades, setGrades] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch all grades from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/instructor/grades/all")
      .then((response) => {
        setGrades(response.data);
        setFilteredGrades(response.data);
      })
      .catch(() => setError("Failed to load student results."));
  }, []);

  // ✅ Search grades by Student ID
  const handleSearch = () => {
    if (!searchId.trim()) {
      setFilteredGrades(grades);
      setError("");
      return;
    }

    const results = grades.filter(
      (grade) =>
        grade.student &&
        grade.student.studentid &&
        grade.student.studentid.toLowerCase().includes(searchId.toLowerCase())
    );

    if (results.length > 0) {
      setFilteredGrades(results);
      setError("");
    } else {
      setFilteredGrades([]);
      setError("No records found for this Student ID.");
    }
  };

  const handleDashboard = () => navigate("/admin/dashboard");

  return (
    <div className="container mt-4" style={{ maxWidth: "1200px" }}>
      <h2 className="text-center text-primary fw-bold mb-4">
        📊 Student Grades Report
      </h2>

      {/* 🔍 Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter Student ID..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ width: "260px" }}
        />
        <button onClick={handleSearch} className="btn btn-primary me-2">
          Search
        </button>
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
              <th>Si.No</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrades.length > 0 ? (
              filteredGrades.map((g, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{g.student?.studentid ?? "N/A"}</td>
                  <td>{g.student?.name ?? "N/A"}</td>
                  <td>{g.subjectName ?? "Subject Name"}</td>
                  <td>{g.subjectCode ?? "Subject Code"}</td>
                  <td>{g.marks ?? "Total Marks"}</td>
                  <td>{g.obtainedMarks ?? "Obtained Mark"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted py-3">
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

export default Report;
