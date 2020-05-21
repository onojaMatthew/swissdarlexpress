import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deleteReport, getReport } from "../../store/actions/action_report";
import { Row, Col, Card, CardBody } from 'reactstrap';
import { message, Spin,  } from "antd";

const ReportList = () => {
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

  const reportList = reports.reports && reports.reports;
  
  return (
    <div>
      <Row>
        <Col xs="10" xl="12">
            {reports.loading === true ? (
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
                <Card style={{ minHeight: 450 }}>
                  <CardBody>
                    <Row key={report._id}>
                      <Col xl="12">
                        <p style={{
                          color: "#333"
                        }}>{report.title} <span className="lead">{moment(report.createdA).format("hh:mm:ss a")}</span></p>
                        <div>{report.report}</div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              )) : (
                <p className="">No records found</p>
              )
            )}
        </Col>
      </Row>
      
    </div>
  )
}

export default ReportList;