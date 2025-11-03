import React from "react";
import { Container } from "react-bootstrap";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero d-flex align-items-center text-center" id="home">
      <Container>
        <h1 className="display-5 fw-bold text-white">Welcome to Acadimica Suite</h1>
        <p className="text-light mt-3 mb-4">
          Streamline college management and connect students, instructors, and administrators on one powerful platform.
        </p>
        <a href="#about" className="btn btn-warning px-4 py-2">
          Learn More
        </a>
      </Container>
    </section>
  );
}

export default Hero;
