import React from "react";
import { Input, Row, Col } from 'reactstrap';


const PackageInfo = ({
  packageInfo,
  weight,
  dimension,
  specialInstruction,
  numOfPieces,
  setPackageInfo,
  setWeight,
  setNumOfPieces,
  setDimension,
  setSpecialInstruction,
  setUnit,
  units,
  errors
}) => {
  return(
    <div>
      <Row>
        <Col xs="12" xl="3">
          <div className="mb-3">
            <label htmlFor="packInf">Package Information</label>
            <Input 
              placeholder="Package Information"
              value={packageInfo}
              id="packInf"
              onChange={(e) => setPackageInfo(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["packageInfo"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="3">
          <div className="mb-3">
            <label htmlFor="num">Numer of Pieces</label>
            <Input
              type="number"
              placeholder="Numer of Pieces"
              value={numOfPieces}
              id="num"
              min="1"
              onChange={(e) => setNumOfPieces(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["numOfPieces"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="3">
          <div className="mb-3">
            <label htmlFor="weight">Weight</label><br/>
            <Input
              value={weight}
              id="weight"
              placeholder="example 30"
              min={1}
              onChange={(e) => setWeight(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["weight"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="3">
          <div className="mb-3">
            <label htmlFor="unit">Select the weight unit</label>
            <Input id="unit" type="select" onChange={(e) => setUnit(e.target.value)}>
              <option>Select weight unit</option>
              {units.map((unit, i) => (
                <option key={i} value={unit}>{unit}</option>
              ))}
            </Input>
            <span style={{ color: "#ff0000" }}>{errors["unit"]}</span>
          </div>
        </Col>
      </Row>
      
      
      <Row>
        <Col xs="12" xl="6">
          <div className="mb-3">
            <label htmlFor="dim">Dimension</label>
            <Input
              id="dim"
              type="text"
              placeholder="Dimension"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["dimension"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="6">
        <div className="mb-3">
        <label htmlFor="special">Special Instruction</label>
        <Input 
          placeholder="Special Instruction"
          value={specialInstruction}
          id="special"
          onChange={(e) => setSpecialInstruction(e.target.value)}
        />
        <span style={{ color: "#ff0000" }}>{errors["specialInstruction"]}</span>
      </div>
        </Col>
      </Row>
     
    </div>
  )
}

export default PackageInfo;