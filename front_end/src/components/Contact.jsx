import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <section
      id="contact"
      className="py-5"
      style={{
        background: "linear-gradient(180deg, #f9fbff 0%, #eef2f7 100%)",
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{ color: "#004aad", letterSpacing: "0.5px" }}
          >
            Get in Touch
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Have a question or need assistance? We’d love to hear from you.  
            Send us a message and our team will get back to you promptly.
          </p>
        </div>

        <Row className="align-items-stretch g-4">
          {/* Contact Information */}
          <Col md={4}>
            <div
              className="h-100 p-4 text-light shadow-lg rounded-4"
              style={{
                background:
                  "linear-gradient(135deg, #4c6ef5 0%, #15aabf 100%)",
              }}
            >
              <h5 className="fw-bold mb-4 border-bottom pb-2">Contact Info</h5>
              <p className="mb-3">
                📧 <strong>Email:</strong> <br />
                <span className="small">info@academiasuite.edu</span>
              </p>
              <p className="mb-3">
                📞 <strong>Phone:</strong> <br />
                <span className="small">+91 98765 43210</span>
              </p>
              <p className="mb-3">
                📍 <strong>Address:</strong> <br />
                <span className="small">
                  123 College Road, New Delhi, India
                </span>
              </p>
              <hr className="border-light" />
              <p className="small">
                <em>Office Hours:</em> <br />
                Mon – Fri: 9:00 AM – 6:00 PM
              </p>
            </div>
          </Col>

          {/* Contact Form */}
          <Col md={8}>
            <div
              className="h-100 bg-white p-5 shadow-sm rounded-4 border"
              style={{
                borderColor: "#e0e6ed",
              }}
            >
              <h5 className="fw-bold mb-4" style={{ color: "#004aad" }}>
                Send Us a Message
              </h5>

              <Form>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label className="fw-semibold small text-secondary">
                        Your Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold small text-secondary">
                        Your Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="message">
                  <Form.Label className="fw-semibold small text-secondary">
                    Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your message here..."
                    className="rounded-3"
                    required
                  />
                </Form.Group>

                <div className="text-end">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2 rounded-3 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #4c6ef5 0%, #15aabf 100%)",
                      border: "none",
                      transition: "0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    Send Message
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contact;
