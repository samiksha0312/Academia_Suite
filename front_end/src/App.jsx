import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComp from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Navbar with Login button */}
      <NavbarComp onLoginClick={() => setShowModal(true)} />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal show={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

export default App;
