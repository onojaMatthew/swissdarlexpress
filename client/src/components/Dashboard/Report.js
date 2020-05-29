import React, { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Row, Col, Input } from "reactstrap";
import { Spin, Button, message } from "antd";
import { sendReport } from "../../store/actions/action_report";
import ReportList from "./ReportList";
import { localAuth } from "../../helper/authentcate";

export const Report = () => {
  const reports = useSelector(state => state.report);
  const [ title, setTitle ] = useState("");
  const [ report, setReport ] = useState("");
  const [ setErrors ] = useState("");
  const [ toggle, setToggle ] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e, name) => {
    e.preventDefault();
    setErrors("");
    if (name === "title") {
      setTitle(e.target.value);
    } else {
      setReport(e.target.value);
    }
  }

  const handleSubmit = () => {
    const data = {
      title, report
    }
    dispatch(sendReport(data));
  }

  const info = (msg) => {
    message.success(msg);
  };

  const error = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    if (reports.success === true) {
      info("Report sent");
    } else if (reports.error && reports.error.length > 0) {
      error(reports.error);
    }
  }, [ dispatch, reports ]);

  const userRole = localAuth().user && localAuth().user.role;

  return (
    <div>
      {toggle === true ? <ReportList setToggle={setToggle} /> : (
        <Row className="justify-content-center">
          <Col xl="12">
            <Card>
              <CardBody style={{ minHeight: 400 }}>
                <Row className="justify-content-center">
                  <Col xl="6" className="mt-5">
                    <h6>Send Report</h6>
                    <Row className="mb-3">
                      <Col xl="12">
                        <Input 
                          type="text" 
                          placeholder="Title"
                          value={title}
                          onChange={(e) => handleChange(e, "title")}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xl="12">
                        <Input 
                          type="textarea" 
                          placeholder="What's on your mind..."
                          value={report}
                          onChange={(e) => handleChange(e, "report")}
                        />
                      </Col>
                    </Row>
                    {reports.loading === true ? (
                      <div className="text-center">
                        <Spin tip="Processing..." />
                      </div>
                    ) : (
                      <Button style={{
                          width: "100%",
                          marginTop: 15
                        }} type="primary"
                        onClick={() => handleSubmit()}
                      >Send Report</Button>
                    )}
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm="9">
                  <span onClick={() => setToggle(true)} style={{
                      color: "#1890ff",
                      float: "right"
                    }}
                  >
                    {userRole === "super_admin" ? "View Report List" : null}
                  </span>
                  </Col>
                  <Col sm="2">
                  
                  </Col>
                </Row>
              </CardBody>
              <Row>
                <Col xl="10"></Col>
                <Col xl="2"></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}