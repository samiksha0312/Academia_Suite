import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ✅ Import background images
import bg1 from "../assets/bg.jpg";
import bg2 from "../assets/bg1.jpeg";
import bg3 from "../assets/bg2.jpeg";
import bg4 from "../assets/bg3.jpeg";

function Hero() {
  const images = [bg1, bg2, bg3, bg4];
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Manual navigation
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // ✅ Navigate to About
  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section
      className="hero-section position-relative d-flex align-items-center justify-content-center text-center text-white"
      style={{
        height: "100vh",
        marginTop: "-0px",
        backgroundImage: `url(${images[currentImage]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
    
      }}
    >
      {/* Gradient Overlay */}
      <div
        className="overlay position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
          zIndex: 1,
        }}
      ></div>

      {/* Hero Content */}
      <div
        className="content position-relative"
        style={{
          zIndex: 2,
          maxWidth: "700px",
          padding: "0 20px",
          marginTop: "-60px", // ✅ Push content slightly up to fill any remaining gap under fixed navbar
        }}
      >
        <h1 className="display-4 fw-bold mb-3">
          Welcome to <span style={{ color: "#FFD700" }}>Academia Suite</span>
        </h1>
        <p className="lead mb-4">
          Streamlining Administration, Empowering Learning.
        </p>

        {/* ✅ Only Learn More button */}
        <Button
          variant="light"
          className="fw-semibold px-4 shadow-sm"
          onClick={handleLearnMore}
          style={{ zIndex: 3, position: "relative" }}
        >
          <a href="#about" style={{ textDecoration: "none"}}>
            Learn More
          </a>
        </Button>
      </div>

      {/* Navigation Arrows */}
      <div
        className="arrows position-absolute w-100 d-flex justify-content-between px-4"
        style={{ top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
      >
        <FaChevronLeft
          size={30}
          className="text-white cursor-pointer"
          onClick={prevImage}
          style={{ cursor: "pointer" }}
        />
        <FaChevronRight
          size={30}
          className="text-white cursor-pointer"
          onClick={nextImage}
          style={{ cursor: "pointer" }}
        />
      </div>
    </section>
  );
}

export default Hero;
