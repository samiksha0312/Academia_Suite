import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // ✅ Make sure your logo file name matches

function Footer() {
  return (
    <footer
      className="pt-5 pb-3 text-light"
      style={{
        background: "linear-gradient(135deg, #4c6ef5 0%, #7950f2 100%)",
      }}
    >
      <Container>
        <Row className="gy-4">
          {/* ===== About Section ===== */}
          <Col md={4}>
            <div className="d-flex align-items-center mb-3">
              <Image
                src={logo}
                alt="Academia Suite Logo"
                width="45"
                height="45"
                className="me-2 rounded-circle bg-white p-1"
              />
              <h5 className="fw-bold mb-0">Academia Suite</h5>
            </div>
            <p className="small text-light opacity-75">
              Streamlining college management and enhancing learning experiences 
              through an all-in-one academic platform designed for modern institutions.
            </p>
          </Col>

          {/* ===== Quick Links ===== */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <a
                  href="#home"
                  className="text-light text-decoration-none"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#about"
                  className="text-light text-decoration-none"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contact"
                  className="text-light text-decoration-none"
                >
                  Contact
                </a>
              </li>
              
            </ul>
          </Col>

          {/* ===== Contact Details ===== */}
          <Col md={4}>
            <h5 className="fw-semibold mb-3">Contact Us</h5>
            <p className="small mb-2 d-flex align-items-center">
              <FaEnvelope className="me-2" /> info@academiasuite.edu
            </p>
            <p className="small mb-2 d-flex align-items-center">
              <FaPhone className="me-2" /> +91 98765 43210
            </p>
            <p className="small mb-3 d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> 123 College Road, New Delhi
            </p>

            {/* Social Icons */}
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light fs-5"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="mt-4 mb-3 border-light opacity-25" />

        {/* Copyright */}
        <div className="text-center small opacity-75">
          © {new Date().getFullYear()} <strong>Academia Suite</strong>. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
