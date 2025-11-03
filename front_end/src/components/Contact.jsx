import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <section id="contact" className="py-5 bg-light-subtle">
      <Container>
        <h2 className="text-center mb-4">Contact Us</h2>
        <Row className="g-4">
          <Col md={4}>
            <div className="p-3 bg-white shadow-sm rounded">
              <p>📧 <strong>Email:</strong> info@acadimicasuite.edu</p>
              <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
              <p>📍 <strong>Address:</strong> 123 College Road, New Delhi</p>
            </div>
          </Col>
          <Col md={8}>
            <div className="p-4 bg-white shadow-sm rounded">
              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Control type="text" placeholder="Your Name" required />
                  </Col>
                  <Col md={6}>
                    <Form.Control type="email" placeholder="Your Email" required />
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Your Message" />
                </Form.Group>
                <Button variant="warning" type="submit">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
