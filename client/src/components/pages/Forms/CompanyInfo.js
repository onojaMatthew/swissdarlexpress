import React from "react";
import { Input } from "antd";
import { Row, Col } from "reactstrap";

const CompanyInfo = ({
  companyName,
  contactLName,
  contactFName,
  email,
  phone,
  setCompanyName,
  setContactFName,
  setContactLName,
  setEmail,
  setPhone,
  errors,
}) => {
  return(
    <div>
      <Row>
        <Col xs="12" xl="6">
          <div className="mb-3">
            <label htmlFor="company">Company Name</label>
            <Input 
              placeholder="Company name"
              value={companyName}
              id="company"
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["companyName"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="6">
          <div className="mb-3">
            <label htmlFor="firstName">Contact first name</label>
            <Input 
              placeholder="Contact first name"
              value={contactFName}
              id="firstName"
              onChange={(e) => setContactFName(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["contactFName"]}</span>
          </div>
        </Col>
      </Row>
      
      
      <Row>
        <Col xs="12" xl="6">
          <div className="mb-3">
            <label htmlFor="lastName">Contact last name</label>
            <Input 
              placeholder="Contact last name"
              value={contactLName}
              id="lastName"
              onChange={(e) => setContactLName(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["contactLName"]}</span>
          </div>
        </Col>
        <Col xs="12" xl="6">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ color: "#ff0000" }}>{errors["email"]}</span>
          </div>
        </Col>
      </Row>
      <div className="mb-3">
        <label htmlFor="phone">Phone Number</label>
        <Input 
          placeholder="Phone"
          value={phone}
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <span style={{ color: "#ff0000" }}>{errors["phone"]}</span>
      </div>
    </div>
  )
}

export default CompanyInfo;