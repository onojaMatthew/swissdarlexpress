import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipment, shipmentDelivered, view, approve } from "../../store/actions/action_shipment";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import { Spin, Input, Divider, Button } from "antd"

const { TextArea } = Input;

const ShipmentDetails = () => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const shipmentId = window.location.pathname.slice(21, 45);

  console.log(shipmentId, " the id")
  useEffect(() => {
    dispatch(getShipment(shipmentId));
  }, [ dispatch, shipmentId ]);

  useEffect(() => {
    dispatch(view(shipmentId));
  }, [ dispatch ]);

  const completeDelivery = (e) => {
    e.preventDefault();
    dispatch(shipmentDelivered(shipmentId));
  }

  const approveRequest = (e) => {
    e.preventDefault();
    dispatch(approve(shipmentId));
  }

  const shipmentDetails = shipment.shipment
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="11" xl="11">
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
              <Table className="hovered" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Contact first name</th>
                    <th>Contact last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pick-up Address</th>
                    <th>Pick-up City</th>
                    <th>Pick-up State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{shipmentDetails.companyName}</td>
                    <td>{shipmentDetails.contactFName}</td>
                    <td>{shipmentDetails.contactLName}</td>
                    <td>{shipmentDetails.email}</td>
                    <td>{shipmentDetails.phone}</td>
                    <td>{shipmentDetails.pickupAddress}</td>
                    <td>{shipmentDetails.pickupCity}</td>
                    <td>{shipmentDetails.pickupState}</td>
                  </tr>
                </tbody>
              </Table>
              
            </Row>
            
            <Row>
              <Table className="hovered" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Destination Address</th>
                    <th>Destination City</th>
                    <th>Destination State</th>
                    <th>Payment Type</th>
                    <th>Package Information</th>
                    <th>No. of Pieces</th>
                    <th>Weight</th>
                    <th>Dimension</th>
                    <th>Shipping Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{shipmentDetails.destinationAddress}</td>
                    <td>{shipmentDetails.destinationCity}</td>
                    <td>{shipmentDetails.destinationState}</td>
                    <td>{shipmentDetails.paid === false ? "Pay on delivery" : "Debit Card"}</td>
                    <td>{shipmentDetails.packageInfo}</td>
                    <td>{shipmentDetails.numOfPieces}</td>
                    <td>{shipmentDetails.weight}</td>
                    <td>{shipmentDetails.dimension}</td>
                    <td>NGN{shipmentDetails.amount}</td>
                  </tr>
                </tbody>
              </Table>
            
            </Row>
            
            <Row>
              <Table className="hovered" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Shipment Status</th>
                    <th>Delayed</th>
                    <th>Approved</th>
                    <th>Instruction</th>
                    <th>Delivery Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{shipmentDetails.status}</td>
                    <td>{shipmentDetails.delayed}</td>
                    <td>{shipmentDetails.approve}</td>
                    <td>{shipmentDetails.specialInstruction}</td>
                    <td>{shipmentDetails.delivered === false ? "Pending" : "Delivered"}</td>
                  </tr>
                </tbody>
              </Table>
            
            </Row>
            <Row>
              <Col xl="6">
                {shipmentDetails.deliverLoading === true ? (
                  <div className="text-center">
                    <Spin tip="Processing..." />
                  </div>
                ) : (
                  <Button 
                    // type="primary" 
                    style={{ color: "#fff", width: "100%", background: "rgb(9, 7, 36)" }}
                    onClick={(e) => completeDelivery(e)}
                  >Click to Complete Delivery</Button>
                )}
              </Col>
              <Col xl="6">
                {shipment.approveLoading === true ? (
                  <div className="text-center">
                    <Spin tip="Processing..." />
                  </div>
                ) : (
                  <Button 
                    type="primary" 
                    style={{ color: "#fff", width: "100%", background: "rgb(9, 7, 36)" }}
                    onClick={(e) => approveRequest(e)}
                  >Approve</Button>
                )}
              </Col>
            </Row>
            </>
          )}
        </CardBody>
      </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ShipmentDetails;