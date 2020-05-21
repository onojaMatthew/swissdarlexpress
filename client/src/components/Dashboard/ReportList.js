import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deleteReport, getReport } from "../../store/actions/action_report";
import { Row, Col, Card, CardBody } from 'reactstrap';
import { message, Spin, Button,  } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ReportList = ({ setToggle }) => {
  const reports = useSelector(state => state.report);
  const dispatch = useDispatch();

  const error = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    dispatch(getReport());
  }, [ dispatch ]);

  
  const onDelete = (id) => {
    dispatch(deleteReport(id));
  }

  useEffect(() => {
    if (reports.error) {
      error(reports.error);
    }
  }, [ reports ]);

  useEffect(() => {
    if (reports.success === true) {
      setToggle(false);
    }
  }, [ reports ]);

  const reportList = reports.reports && reports.reports;
  
  return (
    <div>
      <Row>
        <Col xs="10" xl="12">
            {reports.getLoading === true ? (
              <div className="text-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "43%"
                }}
              >
                <Spin tip="Loading..." />
              </div>
            ) : (
              reportList && reportList.length > 0 ? reportList.map(report => (
                <Card>
                  <CardBody>
                    <Row key={report._id}>
                      <Col xl="12">
                        <div className="mb-3">
                          <span style={{ fontSize: 18}}>{report.reporter && report.reporter.fullname} | {moment(report.createdAt).format("hh:mm:ss a")}</span>
                        </div>
                        <span style={{
                          color: "#333",
                          fontSize: 16,
                          marginTop: 10,
                          marginBottom: 10
                        }}><strong>{report.title}</strong></span>
                        <div>{report.report}</div>
                        {reports.deleteLoading === true ? <Spin tip="Processing..." /> : (
                          <Button style={{
                            float: "right"
                          }} type="danger" onClick={() => onDelete(report._id)}>Delete</Button>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )) : (
                <p className="text-left" style={{ color: "#333" }}>No records found</p>
              )
            )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm="10"></Col>
        <Col sm="2">
          <span 
            onClick={() => setToggle(false)}
            style={{ color: "#1890ff", float: "right", cursor: "pointer" }}>
              <ArrowLeftOutlined /> Back
          </span></Col>
      </Row>
    </div>
  )
}

export default ReportList;