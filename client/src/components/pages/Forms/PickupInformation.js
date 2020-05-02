import React from "react";
import { Input } from "antd";
import { Row, Col } from "reactstrap";
import StateList from "../StateList";

const PickupInformation = ({
  pickupAddress,
  pickupCity,
  pickupState,
  destinationAddress,
  destinationCity,
  destinationState,
  setPickupAddress,
  setPickupCity,
  setPickupState,
  setDestination,
  setDestinationCity,
  setDestinationState,
  errors
}) => {
  return(
    <div>
      <Row>
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="pickadd">Pick-up Address</label>
            <Input 
              placeholder="Pick-up address"
              value={pickupAddress}
              id="pickadd"
              onChange={(e) => setPickupAddress(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["pickupAddress"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="pickcity">Pick-up City</label>
            <Input 
              placeholder="Pick-up City"
              value={pickupCity}
              id="pickcity"
              onChange={(e) => setPickupCity(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["pickupCity"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="pickstate">Pick-up State</label>
            <StateList stateName={pickupState} setState={setPickupState} />
            <span style={{ color: "#ff0000" }}>{errors["pickupState"]}</span>
          </div>
        </Col>
      </Row>
      
      <Row>
        
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="desa">Destination Address</label>
            <Input
              placeholder="Destination address"
              value={destinationAddress}
              id="desa"
              onChange={(e) => setDestination(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["destinationAddress"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="desc">Destination City</label>
            <Input 
              placeholder="Destination address"
              value={destinationCity}
              id="desc"
              onChange={(e) => setDestinationCity(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["destinationCity"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="4">
          <div className="mb-3">
            <label htmlFor="desst">Destination State</label>
            <StateList stateName={destinationState} setState={setDestinationState} />
            <span style={{ color: "#ff0000" }}>{errors["destinationState"]}</span>
          </div>
        </Col>
      </Row>
     
    </div>
  )
}

export default PickupInformation;