import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function NavbarComp({ onLoginClick }) {
  return (
    <Navbar
      expand="lg"
      bg="primary" // Bootstrap theme color or you can use custom color in style
      variant="dark"
      fixed="top" // keeps it at top when scrolling
      className="shadow-sm"
      style={{
        background: "linear-gradient(90deg, #004aad, #007bff)", // gradient blue
      }}
    >
      <Container>
        <Navbar.Brand href="#" className="fw-bold text-white fs-4">
          Acadimica Suite
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="text-white me-3">Home</Nav.Link>
            <Nav.Link href="#about" className="text-white me-3">About</Nav.Link>
            <Nav.Link href="#contact" className="text-white me-3">Contact</Nav.Link>
            <Button
              variant="light"
              className="text-primary fw-semibold px-4"
              onClick={onLoginClick}
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
