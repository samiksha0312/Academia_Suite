import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-4 bg-dark text-light">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Acadimica Suite</h5>
            <p className="small">Empowering colleges through smart digital transformation.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Details</h5>
            <p className="small mb-1">📧 info@acadimicasuite.edu</p>
            <p className="small">📞 +91 98765 43210</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center small mb-0">© 2025 Acadimica Suite. All Rights Reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
