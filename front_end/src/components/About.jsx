import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

function About() {
  return (
    <section
      className="about py-5"
      id="about"
      style={{
        background: "linear-gradient(180deg, #f9fbfd 0%, #ffffff 100%)",
      }}
    >
      <Container>
        {/* ABOUT HEADING */}
        <h2 className="text-center mb-4 fw-bold">
          About <span className="text-primary">Academia Suite</span>
        </h2>
        <p className="text-center text-muted mb-5">
          Academia Suite is a comprehensive and modern college management platform
          designed to simplify academic operations, enhance communication, and support
          digital learning environments. It helps faculty, students, and administrators
          connect seamlessly through smart dashboards, real-time updates, and easy access
          to learning materials. With advanced analytics, cloud-based performance tracking,
          and secure data handling, Academia Suite empowers institutions to embrace
          innovation, achieve academic excellence, and promote an engaging campus experience.
        </p>

        {/* TRUSTED STATS */}
        <div className="text-center mb-5">
          <h3 className="fw-bold">
            Trusted by <span style={{ color: "#007bff" }}>Thousands</span>
          </h3>
          <p className="text-muted">
            Join a thriving academic community powered by innovation and excellence.
          </p>
        </div>

        <Row className="text-center g-4 mb-5">
          <Col md={3} sm={6}>
            <h2 className="fw-bold" style={{ color: "teal" }}>15,000+</h2>
            <p className="text-muted">Active Students</p>
          </Col>
          <Col md={3} sm={6}>
            <h2 className="fw-bold" style={{ color: "#3aa" }}>850+</h2>
            <p className="text-muted">Faculty Members</p>
          </Col>
          <Col md={3} sm={6}>
            <h2 className="fw-bold" style={{ color: "#28a745" }}>500+</h2>
            <p className="text-muted">Courses Available</p>
          </Col>
          <Col md={3} sm={6}>
            <h2 className="fw-bold" style={{ color: "#ff6600" }}>98%</h2>
            <p className="text-muted">Satisfaction Rate</p>
          </Col>
        </Row>

        {/* COLLEGE IMAGE GALLERY */}
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-4">Campus Glimpse</h3>
          <p className="text-muted mb-4">
            Take a look at our vibrant campus, where innovation meets education.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
  {[
    {
      img: "/images/compus.jpg",
      title: "Main Campus",
      desc: "The heart of our college life with modern learning spaces.",
    },
    {
      img: "/images/sports.jpg",
      title: "Sports Complex",
      desc: "World-class facilities promoting teamwork, health, and competition spirit.",
    },
    {
      img: "/images/library.jpg",
      title: "Library",
      desc: "A peaceful space filled with thousands of books and digital resources.",
    },
    {
      img: "/images/fest.jpg",
      title: "College Fest",
      desc: "Where creativity and talent shine through events and performances.",
    },
    {
      img: "/images/classroms.jpg",
      title: "Classroom Learning",
      desc: "Interactive sessions that combine traditional and modern teaching methods.",
    },
    {
      img: "/images/labs.jpg",
      title: "Innovation Lab",
      desc: "Cutting-edge lab fostering research, innovation, and creative projects.",
    },
  ].map((item, idx) => (
    <Col md={4} sm={6} key={idx}>
      <Card
        className="border-0 shadow-sm rounded-4 overflow-hidden h-100"
        style={{ minHeight: "380px" }}
      >
        {/* Image Section */}
        <div
          style={{
            position: "relative",
            height: "220px",
            overflow: "hidden",
          }}
        >
          <Image
            src={item.img}
            alt={item.title}
            fluid
            className="img-hover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.55)",
              color: "#fff",
              padding: "6px 0",
              fontSize: "0.9rem",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {item.title}
          </div>
        </div>

        {/* Description */}
        <Card.Body className="d-flex align-items-center justify-content-center">
          <p
            className="text-muted text-center mb-0"
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.4rem",
              minHeight: "80px",
            }}
          >
            {item.desc}
          </p>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

      </Container>

      {/* IMAGE HOVER EFFECT */}
      <style>{`
        .img-hover {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .img-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}

export default About;
