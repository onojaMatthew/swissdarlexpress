import React from "react";
import { Row, Container, Col, Button } from "reactstrap";
import { Divider } from "antd";

const styles = {
  icon: {
    fontSize: 26,
    color: "#fff",
    marginLeft: 13,
    marginTop: 15,
    cursor: "pointer"
  },
  hr: {
    color: "#fff"
  },
  button: {
    border: "1px solid #ccc",
    borderRadius: 0,
    background: "#000",
    color: "#fff",
    marginTop: 20
  }
}
const Footer = () => {
  const getLocation = () => {
    window.location.href = "https://www.google.com/maps/dir/6.6203869,3.3691252/swissdarl/@6.5691875,3.3340681,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103b8d1ae12720e3:0xf63884eea9bfa197!2m2!1d3.3631325!2d6.5078251"
  }
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col xs="5" xl="10"></Col>
          <Col xs="7" xl="2"></Col>
        </Row>
        <Divider />
        <Row>
          <Col xs="12" xl="3">
          <p>3, Clegg Lane, Off Western Avenue Ojuelegba, Surulere,  Lagos, Nigeria.</p>
          <Button style={styles.button} onClick={() => getLocation()}>GET LOCATION</Button>
          </Col>
          <Col xs="12" xl="3">
            <h6 style={{ color: "#fff"}}>OFFICES</h6>
            <Row>
              <Col xs="6" xl="5" className="branches">
                <p>Lagos</p>
                <p>Port Harcourt</p>
                <p>Abuja</p>
                <p>Enugu</p>
                <p>Delta</p>
                <p>Kano</p>
                <p>Jos</p>
              </Col>
              <Col xs="6" xl="5">
                  <p>United Kingdom</p>
                <p>China</p>
                <p>South Africa</p>
                <p>Ivory Cost</p>
                <p>Ghana</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;