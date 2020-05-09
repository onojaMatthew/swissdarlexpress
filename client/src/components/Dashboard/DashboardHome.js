import React from "react";
import { Card, CardBody, Col, Row, CardHeader } from "reactstrap";
import { Divider } from "antd";
import { MailOutlined, UserOutlined, HeatMapOutlined, TableOutlined, PhoneOutlined, LikeOutlined, ExclamationCircleOutlined, SnippetsOutlined, CheckSquareOutlined, CheckCircleOutlined, CarOutlined, StockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DashboardHome = () => {
    return (
        <div>
            <Card className="mb-3">
                <CardBody>
                    <Row>
                        <Col xs="12" xl="1">
                            <div className="sy-background">SY</div>
                        </Col>
                        <Col xs="12" xl="9">
                            <Row>
                                <Col><h5>System Administration</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="6" xl="3"><MailOutlined style={{
                                    marginRight: "3px"
                                }} />email@gmail.com</Col>
                                <Col xs="6" xl="3"><UserOutlined style={{
                                    marginRight: "3px"
                                }}/>General manager</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col xs="12" xl="3">
                            <Row>
                                <Col xs="3" xl="2"><CheckSquareOutlined style={{
                                    fontSize: 40
                                }} /></Col>
                                <Col xs="3" xl="9">
                                    <span style={{ fontSize: 12, color: "#333" }}>0 Shippment</span><br />
                                    <span style={{ fontSize: 12, color: "#333" }}>Approved List</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" xl="3">
                            <Row>
                                <Col xs="3" xl="2"><StockOutlined style={{
                                    fontSize: 40
                                }} /></Col>
                                <Col xs="3" xl="9">
                                    <span style={{ fontSize: 12, color: "#333" }}>0 Shippment</span><br />
                                    <span style={{ fontSize: 12, color: "#333" }}>In Stock List</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" xl="3">
                            <Row>
                                <Col xs="3" xl="2"><CheckCircleOutlined style={{
                                    fontSize: 40
                                }} /></Col>
                                <Col xs="3" xl="9">
                                    <span style={{ fontSize: 12, color: "#333" }}>0 Shippment</span><br />
                                    <span style={{ fontSize: 12, color: "#333" }}>Delivered List</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12" xl="3">
                            <Row>
                                <Col xs="3" xl="2"><SnippetsOutlined style={{
                                    fontSize: 40
                                }} /></Col>
                                <Col xs="3" xl="9">
                                    <span style={{ fontSize: 12, color: "#333" }}>0 New Shipping Requests</span><br />
                                    <span style={{ fontSize: 12, color: "#333" }}><Link to="/">View</Link></span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </CardBody>
            </Card>
            <Row>
                <Col xs="12" xl="4">
                    <Card style={{ minHeight: 400 }}>
                        
                        <CardBody>
                            <Row>
                                <Col xs="9" xl="12">Summary Statitics Summary</Col>
                            </Row>
                            <Divider />
                            <Row className="mb-5">
                                <Col xs="9" xl="9"><CarOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} />All Shipments</Col>
                                <Col xs="3" xl="3">12</Col>
                            </Row>
                            <Row className="mb-5">
                                <Col xs="9" xl="9"><ExclamationCircleOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><span style={{
                                    color: "red"
                                }}>Delayed Shipments</span></Col>
                                <Col xs="3" xl="3">9</Col>
                            </Row>
                            <Row className="mb-5">
                                <Col xs="9" xl="9"><PhoneOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><span style={{
                                    color: "orange"
                                }}>Pre Alert to Approve</span></Col>
                                <Col xs="3" xl="3">3</Col>
                            </Row>
                            <Row className="mb-5">
                                <Col xs="9" xl="9"><TableOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><span>Pickup Lists</span></Col>
                                <Col xs="3" xl="3">5</Col>
                            </Row>
                            <Row>
                                <Col xs="9" xl="9"><LikeOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><span style={{
                                    color: "green"
                                }}>Delivered</span></Col>
                                <Col xs="3" xl="3">34</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 416 }}>
                        <CardBody>
                            <Row>
                                <Col xs="12" xl="12"><h5>NGN100.00</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Pending Payment</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 416 }}>
                        <CardBody>
                            <Row>
                                <Col xs="12" xl="12"><h5>NGN100.00</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Current Month Sales</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" xl="2">
                    <Card style={{ minHeight: 416 }}>
                        <CardBody>
                            <Row>
                                <Col xs="12" xl="12"><h5 style={{ color: "red"}}>0%</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Delayed Shipping Percentagge</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardHome;