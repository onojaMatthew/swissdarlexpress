import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Container } from "reactstrap"
import HomeCarousel from "./Carousel";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return(
    <div className="home">
      <Header />
      <section className="wave-container">
        <Row className="justify-content-center">
          <Col xs="11" xl="6" className="home-text">
            <h1>Welcome to Swissdarl Express</h1>
          </Col>
        </Row>
        <svg id="curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fill-opacity="1" d="M0,192L80,176C160,160,320,128,480,149.3C640,171,800,245,960,256C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </section>
      <section className="sec2">
        <Container>
          <Row className="justify-content-center carou">
            <Col xs="6" xl="5"
              style={{
                marginTop: -200,
                maxHeight: "250px"
              }}
            >
              <HomeCarousel />
            </Col>
          </Row>
        </Container>
          <div className="fix-img">
            <Row className="justify-content-center">
              <Col xs="12" xl="6" 
                className="how-we-work"
              >
                {/* <h4>How We Work</h4> */}
                <p>
                  At Darlstone Logistics, we are committed to providing smart and effective Logistics Solutions for every business. With timed deliveries that offer complete flexibility.
                </p>
              </Col>
            </Row>
          </div>
          
          <Row className="justify-content-center btn-cont">
            <Col xs="5" xl="3" style={{ minHeight: 250 }}>
              <Button className="quote-btn">
                <Link style={{ color: "#fff" }} to="/request">Request a Quote</Link>  
              </Button>
            </Col>
          </Row>
      </section>
      <Footer />
    </div>
  )
}

export default Home;
