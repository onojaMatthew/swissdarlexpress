import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipment, view, approve, changeStatus } from "../../store/actions/action_shipment";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { Spin, Button } from "antd";
import { localAuth } from "../../helper/authentcate";

const ShipmentDetails = () => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const shipmentId = window.location.pathname.slice(21, 45);

  useEffect(() => {
    dispatch(getShipment(shipmentId));
  }, [ dispatch, shipmentId ]);

  useEffect(() => {
    dispatch(view(shipmentId));
  }, [ dispatch ]);

  const handleStatus = (status) => {
    dispatch(changeStatus(status, shipmentId));
  }

  const role = localAuth().user && localAuth().user.role;
  const shipmentDetails = shipment.shipment;
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" xl="12">
          <Card style={{ minHeight: 450 }}>
            <h5 style={{
                  color: "#1890ff",
                  padding: "10px"
                }}>Shipment details</h5>
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
                <Row>
                  <Table responsive bordered style={{ fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Contact name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Pick-up Address</th>
                        <th>Pick-up City</th>
                        <th>Pick-up State</th>
                        <th>Destination Address</th>
                        <th>Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{shipmentDetails.companyName}</td>
                        <td>{shipmentDetails.contactFName} {shipmentDetails.contactLName}</td>
                        <td>{shipmentDetails.email}</td>
                        <td>{shipmentDetails.phone}</td>
                        <td>{shipmentDetails.pickupAddress}</td>
                        <td>{shipmentDetails.pickupCity}</td>
                        <td>{shipmentDetails.pickupState}</td>
                        <td>{shipmentDetails.destinationAddress}</td>
                        <td>{shipmentDetails.paid === false ? "True" : "False"}</td>
                      </tr>
                    </tbody>
                  </Table>
                  
                </Row>
                
                <Row>
                  <Table responsive bordered style={{ fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th>Destination City</th>
                        <th>Destination State</th>
                        <th>Payment Type</th>
                        <th>Package Information</th>
                        <th>No. of Pieces</th>
                        <th>Weight</th>
                        <th>Dimension</th>
                        <th>Shipping Cost</th>
                        <th>Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{shipmentDetails.destinationCity}</td>
                        <td>{shipmentDetails.destinationState}</td>
                        <td>{shipmentDetails.paid === false ? "Pay on delivery" : "Debit Card"}</td>
                        <td>{shipmentDetails.packageInfo}</td>
                        <td>{shipmentDetails.numOfPieces}</td>
                        <td>{shipmentDetails.weight}</td>
                        <td>{shipmentDetails.dimension}</td>
                        <td>NGN{shipmentDetails.amount}</td>
                        <td>
                          {shipmentDetails.status === "delivered_to_driver" ? "Deliver to driver" : shipmentDetails.status === "delivered_to_receiver" ? "Delivered to receiver" : shipmentDetails.status === "returned" ? "Returned" : shipmentDetails.status === "delayed" ? "Delayed" : shipmentDetails.status && shipmentDetails.status.charAt(0).toUpperCase() + shipmentDetails.status.slice(1)}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
                </>
              )}
              {role === "admin" && shipmentDetails.status !== "delivered_to_receiver" ? (
                <Row className="justify-content-center mt-5">
                  <Col xs="10" xl="8">
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
                      {/* <Col xs="3" xl="2">
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
                        
                      </Col> */}
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
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShipmentDetails;