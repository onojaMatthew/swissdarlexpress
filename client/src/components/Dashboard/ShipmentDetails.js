import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipment, shipmentDelivered, view } from "../../store/actions/action_shipment";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Spin, Input, Divider, Button } from "antd"

const { TextArea } = Input;

const ShipmentDetails = () => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const shipmentId = window.location.pathname.slice(11, 35);

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

  const shipmentDetails = shipment.shipment
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="11" xl="11">
        <Card style={{ minHeight: 450 }}>
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
            <Divider orientation="left">Company Information</Divider>
            <Row>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="company">Company Name</label>
                  <Input 
                    value={shipmentDetails.companyName}
                    id="company"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="firstName">Contact first name</label>
                  <Input 
                    value={shipmentDetails.contactFName}
                    id="firstName"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="lastName">Contact last name</label>
                  <Input 
                    value={shipmentDetails.contactLName}
                    id="lastName"
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            
            
            <Row>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={shipmentDetails.email}
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <Input 
                    value={shipmentDetails.phone}
                    id="phone"
                    readOnly
                  />
                </div>
              </Col>
              
            </Row>
            <Divider orientation="left">Pick-up Information</Divider>
            <Row>
              <Col xs="12" xl="12">
                <div className="mb-3">
                  <label htmlFor="pickadd">Pick-up Address</label>
                  <Input 
                    value={shipmentDetails.pickupAddress}
                    id="pickadd"
                    // autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            <Row>
              
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="pickcity">Pick-up City</label>
                  <Input 
                    value={shipmentDetails.pickupCity}
                    id="pickcity"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="pickstate">Pick-up State</label>
                  <Input 
                    value={shipmentDetails.pickupState}
                    id="pickstate"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="pickzip">Payment status</label>
                  <Input
                    id="pickzip"
                    value={shipmentDetails.paid === false ? "Pay on delivery" : "Paid"}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="12">
                <div className="mb-3">
                  <label htmlFor="desa">Destination Address</label>
                  <Input 
                    value={shipmentDetails.destinationAddress}
                    id="desa"
                    // autoSize={{ minRows: 3, maxRows: 5 }}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="desc">Destination City</label>
                  <Input 
                    value={shipmentDetails.destinationCity}
                    id="desc"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="desst">Destination State</label>
                  <Input 
                    value={shipmentDetails.destinationState}
                    id="desst"
                    readOnly
                  />
                </div>
              </Col>
              
            </Row>
            
            <Divider orientation="left">Package Description</Divider>
            <Row>
            <Col xs="12" xl="3">
                <div className="mb-3">
                  <label htmlFor="packInf">Package Information</label>
                  <TextArea 
                    value={shipmentDetails.packageInfo}
                    id="packInf"
                    readOnly
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
              </Col>
              <Col xs="12" xl="3">
                <div className="mb-3">
                  <label htmlFor="num">Number of Pieces</label>
                  <Input 
                    value={shipmentDetails.numOfPieces}
                    id="num"
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="3">
              <div className="mb-3">
                <label htmlFor="weight">Weight</label>
                <Input 
                  value={shipmentDetails.weight}
                  id="weight"
                  readOnly
                />
              </div>
              </Col>
              <Col xs="12" xl="3">
              <div className="mb-3">
                <label htmlFor="amount">Amount</label>
                <Input
                  id="amount"
                  type="text"
                  value={`${shipmentDetails.amount} naira`}
                  readOnly
                />
              </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" xl="3">
                <div className="mb-3">
                  <label htmlFor="dimension">Dimension</label>
                  <Input
                    id="dimension"
                    type="text"
                    value={shipmentDetails.dimension}
                    readOnly
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  <label htmlFor="instruction">Special Instruction</label>
                  <TextArea 
                    value={shipmentDetails.specialInstruction}
                    id="instruction"
                    readOnly
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
              </Col>
              <Col xs="12" xl="4">
                <div className="mb-3">
                  
                <label htmlFor="dimension">Shipment status</label>
                <Input
                  id="dimension"
                  type="text"
                  value={shipmentDetails.delivered === false ? "Pending": "Delivered"}
                  readOnly
                />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl="12">
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