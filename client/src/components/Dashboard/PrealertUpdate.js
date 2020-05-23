import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table, Card, CardBody } from "reactstrap";
import { Button, Spin } from "antd";
import { localAuth } from "../../helper/authentcate";
import { getShipment, changeStatus } from "../../store/actions/action_shipment";

const PrealertUpdate = ({ id }) => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const role = localAuth().user && localAuth().user.role;
  useEffect(() => {
    dispatch(getShipment(id));
  }, [ id ]);
  const handleStatus = (status) => {
    dispatch(changeStatus(status, id));
  }

  console.log(id, "this is the id");
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" xl="12">
          <Card style={{ minHeight: 450 }} responsive>
            <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>Pre Alert Shipments</h5>
            <CardBody>
            {shipment.getLoading === true ? (
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
            <>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Contact Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tracking Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.companyName}</td>
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.contactFName} {shipment.shipment && shipment.shipment.contactLName}</td>
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.email}</td>
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.phone}</td>
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.trackingNumber}</td>
                    
                    <td style={{ fontSize: 10 }}>{shipment.shipment && shipment.shipment.status === "delivered_to_driver" ? "Deliver to driver" : shipment.shipment.status === "delivered_to_receiver" ? "Delivered to receiver" : shipment.shipment.status === "returned" ? "Returned" : shipment.shipment.status && shipment.shipment.status.charAt(0).toUpperCase() + shipment.shipment.status.slice(1)}</td>
                  </tr>
                </tbody>
              </Table>
              
              {role === "admin" ? (
                <Row className="justify-content-center mt-5">
                  <Col xs="12" xl="8">
                    <Row>
                      <Col xs="12" xl="3" className="mb-1">
                        {shipment.statusLoading === true ? (
                          <div className="text-center">
                          <Spin tip="Loading..." />
                          </div>
                        ) : (
                          <Button style={{
                            background: "green",
                            color: "#fff"
                          }}
                            onClick={() => handleStatus("delivered_to_driver")}
                          >Delivered to driver</Button>
                        )}
                        
                      </Col>
                      <Col xs="12" xl="3" className="mb-1">
                        {shipment.statusLoading === true ? (
                          <div className="text-center">
                          <Spin tip="Loading..." />
                          </div>
                        ) : (
                          <Button 
                            type="primary"
                            onClick={() => handleStatus("delivered_to_receiver")}
                          >Delivered to receiver</Button>
                        )}
                      </Col>
                      <Col xs="12" xl="2" className="mb-1">
                        {shipment.statusLoading === true ? (
                          <div className="text-center">
                            <Spin tip="Loading..." />
                          </div>
                        ) : (
                          <Button style={{
                            background: "blue",
                            color: "#fff"
                          }}
                          onClick={() => handleStatus("returned")}
                          >Returned</Button>
                        )}
                        
                      </Col>
                      <Col xs="12" className="mb-1" xl="2">
                        {shipment.statusLoading === true ? (
                          <div className="text-center">
                            <Spin tip="Loading..." />
                          </div>
                        ) : (
                          <Button style={{
                            background: "orange",
                            color: "#fff"
                          }}
                          onClick={() => handleStatus("delayed")}
                          >Delayed</Button>
                        )}
                        
                      </Col>
                      <Col xs="12" xl="2" className="mb-1">
                        {shipment.statusLoading === true ? (
                          <div className="text-center">
                            <Spin tip="Loading..." />
                          </div>
                        ) : (
                          <Button type="danger" onClick={() => handleStatus("rejected")}>Rejected</Button>
                        )}
                      </Col>
                    </Row>
                    
                  </Col>
                </Row>
              ) : null}
              </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PrealertUpdate;