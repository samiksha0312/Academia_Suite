// src/components/Navbar.jsx
import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import logo from "../assets/logo.png";

function NavbarComp({ onLoginClick = () => {}, onRegisterClick = () => {} }) {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      className="shadow-sm"
      style={{
        background: "linear-gradient(90deg, #004aad, #007bff)",
      }}
    >
      <Container fluid className="px-4">
        {/* Logo and Brand */}
        <Navbar.Brand href="#home" className="d-flex align-items-center text-white fw-bold">
          <img
            src={logo}
            alt="Academia Suite Logo"
            style={{ width: 38, height: 38, marginRight: 8 }}
          />
          Academia Suite
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link href="#home" className="text-white mx-2">Home</Nav.Link>
            <Nav.Link href="#about" className="text-white mx-2">About</Nav.Link>
            <Nav.Link href="#contact" className="text-white mx-2">Contact</Nav.Link>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-2 mt-2 mt-lg-0">
              <Button
                variant="light"
                className="fw-semibold px-4 text-primary"
                onClick={onLoginClick}
              >
                Login
              </Button>

              <Button
                variant="light"
                className="fw-semibold px-4 text-primary"
                onClick={onRegisterClick}
              >
                Registration
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
