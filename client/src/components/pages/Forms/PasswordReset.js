import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Spin } from "antd";
import { Row, Col, Card,  CardBody } from "reactstrap";
import Header from "../Header";
import Footer from "../Footer";
import { sendEmail } from "../../../store/actions/action_auth";

const PasswordReset = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ message, setMessage ] = useState("");

  const handleChange = (e, name) => {
    setErrors("");
    setEmail(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
    }

    dispatch(sendEmail(data));
  }

  useEffect(() => {
    if (auth.auth.message && auth.auth.message.length > 0) {
      setMessage(auth.auth.message);
    }
  }, [ auth ]);

  // useEffect(() => {
  //   if (users.loginSuccess === true) {
  //     setEmail('');
  //     setPassword("");
  //     setMessage("Login Success!!!");
  //     setInterval(() => {
  //       window.location.href = "/dashboard";
  //     }, 3000);
  //   } else if (users.error && users.error.length > 0 && users.loginSuccess === false) {
  //     setErrors(users.error);
  //   }
  // }, [ users ]);

 return(
    <div className="home">
      <Header />
      <section className="wave-container">
        <Row className="justify-content-center">
          <Col xs="8" xl="6" className="home-text">
            <h1>Reset password</h1>
            {/* <p className="animate-p">Login to the admin dashboard</p> */}
          </Col>
        </Row>
        <svg id="curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fill-opacity="1" d="M0,192L80,176C160,160,320,128,480,149.3C640,171,800,245,960,256C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </section>
      <Row className="justify-content-center">
        <Col xs="10" xl="6">
          <Row>
            <Col>
              <p>{message}</p>
              {errors && errors.length > 0 ? <p style={{ color: "#ff0000" }}>{errors}</p> : null}
            </Col>
          </Row>
          <Card className="mb-5">
            <CardBody>
              <Row>
                <Col xs="12" xl="12">
                  <h5>Password reset</h5>
                </Col>
              </Row>
              <Row>
                <Col xs="12" xl="12">
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Input 
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      id="email"
                      onChange={(e) => handleChange(e, "email")}
                    />
                    <span style={{ color: "#ff0000" }}>{errors["email"]}</span>
                  </div>
                </Col>
              </Row>
              
              <Row className="mb-3">
                <Col xs="12" xl="12">
                  {auth.loading === true ? (
                    <div className="text-center">
                      <Spin tip="Processing..." />
                    </div>
                  ) : (
                    <Button type="primary" 
                      onClick={(e) => handleLogin(e)}
                      style={{ width: "100%",
                      background: "rgb(9, 7, 36)"
                    }}
                    >Send</Button>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default PasswordReset;