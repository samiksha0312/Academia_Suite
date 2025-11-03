import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import NavbarComp from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import RegistrationModal from "./components/RegistrationModal";

// Dashboards
import StudentDashboard from "./components/StudentDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import AdminDashboard from "./components/AdminDashboard";

// Admin Pages
import ManagerUser from "./pages/admin/ManagerUser";
import AddCourse from "./pages/admin/AddCourse";
import Settings from "./pages/admin/Settings";
import Reports from "./pages/admin/Reports";

// Student Pages
import Course from "./pages/student/Course";
import Profile from "./pages/student/Profile";
import Enroll from "./pages/student/Enroll";
import Grades from "./pages/student/Grades";

// Instructor Pages
import CreateAssignment from "./pages/instructor/CreateAssignment";
import GradeStudents from "./pages/instructor/GradeStudents";
import MyCourses from "./pages/instructor/MyCourses";
import InstructorProfile from "./pages/instructor/InstructorProfile";
import UpdateStudent from "./pages/admin/updateStudent";
import UpdateInstructor from "./pages/admin/updateIstructor";
import UpdateCourse from "./pages/admin/updateCourse";
import AssignCourse from "./pages/admin/assignCourse";
import AssignInstructor from "./pages/admin/AssignInstructor";
import Assignment from "./pages/student/Assignment";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const location = useLocation();

  // ✅ Hide Navbar & Footer for Admin, Student, and Instructor dashboards
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/instructor"); // ✅ added instructor here

  return (
    <>
      {/* ✅ Conditionally render Navbar */}
      {!hideLayout && (
        <NavbarComp
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowRegistrationModal(true)}
        />
      )}

      {/* ✅ App Routes */}
      <Routes>
        {/* Public Pages */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginModal />} />  

        {/* Dashboards */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Admin Pages */}
        <Route path="/admin/manage-users" element={<ManagerUser />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/update/student/:id" element={<UpdateStudent />} />
        <Route path="/admin/update/instructor/:id" element={<UpdateInstructor />} />
        <Route path="/admin/update/course/:id" element={<UpdateCourse />} />
        <Route path="/admin/assign-course/student/:userName" element={<AssignCourse />} />
        <Route path="/admin/assign-course/instructor/:userName" element={<AssignInstructor />} />

        {/* Student Pages */}
        <Route path="/student/course" element={<Course />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/enroll/:userName" element={<Enroll />} />
        <Route path="/student/grades" element={<Grades />} />
        <Route path="/student/assignment" element={<Assignment />} />


        {/* Instructor Pages */}
        <Route
          path="/instructor/create-assignment"
          element={<CreateAssignment />}
        />
        <Route
          path="/instructor/grade-students"
          element={<GradeStudents />}
        />
        <Route path="/instructor/profile" element={<InstructorProfile />} />
        <Route path="/instructor/my-courses/:userName" element={<MyCourses />} />
      </Routes>

      {/* ✅ Modals */}
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <RegistrationModal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
      />

      {/* ✅ Conditionally render Footer */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
