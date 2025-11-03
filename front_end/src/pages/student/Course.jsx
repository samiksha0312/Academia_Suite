import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const navigate = useNavigate();
  const { userName } = useParams(); // Assuming userName is passed via route (like /student/courses/:userName)
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Fetch course details from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/auth/course/coursedetails"
        );
        setCourses(res.data);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        setMessage("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Handle enrollment
  const handleEnroll = async (courseId) => {
    try {
      const payload = {
        userName: userName,
        courseId: courseId,
        status: "Active",
      };

      console.log("📡 Enrolling:", payload);

      await axios.post("http://localhost:8080/auth/enrollment/add", payload);
      alert("✅ Successfully enrolled in the course!");

      // Optional: Mark as enrolled in UI
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === courseId ? { ...c, enrolled: true } : c
        )
      );
    } catch (error) {
      console.error("❌ Enrollment failed:", error);
      alert("Enrollment failed. Please try again!");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      {/* Back Button */}
      <div className="mb-4 d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={() => navigate("/student/dashboard")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="mb-4">
        <h1 className="display-6 fw-bold">Available Courses</h1>
        <p className="text-muted">
          Browse and enroll in available courses for this semester
        </p>
      </div>

      {message && (
        <div className="alert alert-danger text-center">{message}</div>
      )}

      {/* Courses */}
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-1 fw-semibold">
                        {course.courseName}
                      </h5>
                      <span className="badge bg-secondary">
                        {course.courseCode}
                      </span>
                    </div>
                    <i className="bi bi-journal-text text-primary fs-5"></i>
                  </div>

                  <p className="card-text text-muted small">
                    {course.description || "No description available."}
                  </p>

                  <ul className="list-unstyled small mb-3">
                    <li className="d-flex align-items-center mb-1 text-muted">
                      <i className="bi bi-person-workspace me-2"></i>
                      Instructor: {course.instructor || "TBA"}
                    </li>
                    <li className="d-flex align-items-center text-muted">
                      <i className="bi bi-clock me-2"></i>
                      Semester: {course.semester}
                    </li>
                  </ul>
                </div>

                <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                  <div className="small">
                    <strong>{course.credits} Credits</strong> •{" "}
                    <span className="text-muted">{course.department}</span>
                  </div>
                  {course.enrolled ? (
                    <button
                      className="btn btn-success btn-sm rounded-pill"
                      disabled
                    >
                      ✅ Enrolled
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary btn-sm rounded-pill"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
