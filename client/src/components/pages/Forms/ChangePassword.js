import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Spin } from "antd";
import { Row, Col, Card,  CardBody } from "reactstrap";
import Header from "../Header";
// import { onLogin } from "../../store/actions/action_user";
import Footer from "../Footer";
import { changePassword } from "../../../store/actions/action_auth";

const ChangePassword = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ message ] = useState("");

  const token = window.location.pathname.slice(17, 58);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (formValidation()) {
      const data = {
        password,
        token
      }

      dispatch(changePassword(data));
    }
    
  }

  const formValidation = () => {
    let formValid = true;
    let errors = {};

    if (password !== confirmPassword) {
      formValid = false;
      errors["confirmPassword"] = "Password do not match";
    }
    setErrors(errors);
    return formValid;
  }

  if (auth.success === true) {
    return <Redirect to="/accountl" />
  }

 return(
    <div className="home">
      <Header />
      <section className="wave-container">
        <Row className="justify-content-center">
          <Col xs="8" xl="6" className="home-text">
            <h1>Reset your password</h1>
            <p className="animate-p"></p>
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
              {message.length > 0 ? <p style={{ color: "#00ff00", fontWeight: "bold"}}>{message}</p> : null}
              {errors.length > 0 ? <p style={{ color: "#ff0000" }}>{errors}</p> : null}
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
                    <label htmlFor="password">Password</label>
                    <Input 
                      placeholder="Enter your new password"
                      type="password"
                      value={password}
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" xl="12">
                  <div className="mb-3">
                    <label htmlFor="confirm">Confirm password</label>
                    <Input 
                      placeholder="Confirm password"
                      type="password"
                      value={confirmPassword}
                      id="confirm"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span style={{ color: "#ff0000" }}>{errors["confirmPassword"]}</span>
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
                      onClick={(e) => handlePasswordChange(e)}
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

export default ChangePassword;