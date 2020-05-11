import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Divider } from "antd";
import { MailOutlined, UserOutlined, TableOutlined, PhoneOutlined, LikeOutlined, ExclamationCircleOutlined, SnippetsOutlined, CheckSquareOutlined, CheckCircleOutlined, CarOutlined, StockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getShipments } from "../../store/actions/action_shipment";
import { localAuth } from "../../helper/authentcate";

const DashboardHome = (props) => {
    const shipments = useSelector(state => state.shipment);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getShipments());
    }, [ dispatch ]);
    const shipmentList = shipments.shipments && shipments.shipments.length;
    const allShipment = shipments.shipments;
    const deliveredList = allShipment.filter(shipment => shipment.delivered === true);
    const pendingView = allShipment.filter(shipment => shipment.isView === false);
    const unpaidDeliveryList = allShipment.filter(shipment => shipment.paid === false);
    const approvedList = allShipment.filter(shipment => shipment.approve === true);
    const pendingPaymentList = [];
    
    for (let i = 0; i < unpaidDeliveryList.length; i++) {
        pendingPaymentList.push(unpaidDeliveryList[i].amount);
    }
    let currentMonth = [];
    const month = new Date().getMonth();
    if (allShipment && allShipment.length > 0) {
        for (let i = 0; allShipment.length; i++) {
        
            const ite = allShipment && allShipment[i] && allShipment[i][0] && allShipment[i][0].createdAt;
            console.log(ite && ite.slice(6, 2), "created at console")
            
        }
    }
    
    const userRole = localAuth().user && localAuth().user.role;
    const userEmail = localAuth().user && localAuth().user.email;
    const pendingPayment = pendingPaymentList.reduce((a, b) => a + b, 0);
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
                                }} />{userEmail && userEmail}</Col>
                                <Col xs="6" xl="3"><UserOutlined style={{
                                    marginRight: "3px"
                                }}/>{userRole && userRole.charAt(0).toUpperCase() + userRole.slice(1)}</Col>
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
                                    <span style={{ fontSize: 12, color: "#333" }}>{approvedList && approvedList.length} Shippment</span><br />
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
                                    <span style={{ fontSize: 12, color: "#333" }}>{pendingView && pendingView.length} Shippment</span><br />
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
                                    <span style={{ fontSize: 12, color: "#333" }}>{deliveredList && deliveredList.length} Shippment</span><br />
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
                                    <span style={{ fontSize: 12, color: "#333" }}>{pendingView && pendingView.length} New Shipping Requests</span><br />
                                    <span style={{ fontSize: 12, color: "#333" }}><Link to="/dashboard/shipments">View</Link></span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </CardBody>
            </Card>
            <Row>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
                        
                        <CardBody>
                            <Row>
                                <Col xs="9" xl="12">Summary Statitics Summary</Col>
                            </Row>
                            <Divider />
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><CarOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} />
                                <Link 
                                    to={`${props.match.url}/shipments`}
                                    style={{
                                        textDecoration: "none"
                                    }}
                                >All Shipments</Link></Col>
                                <Col xs="3" xl="3">{shipmentList}</Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><ExclamationCircleOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} />
                                <Link 
                                    to={`${props.match.url}/shipments/delayed`}
                                    style={{
                                        color: "red",
                                        textDecoration: "none"
                                    }}
                                >Delayed Shipments</Link></Col>
                                <Col xs="3" xl="3">9</Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><PhoneOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><Link to={`${props.match.url}/shipments/prealert`} style={{
                                    color: "orange",
                                    textDecoration: "none"
                                }}>Pre Alert to Approve</Link></Col>
                                <Col xs="3" xl="3">3</Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><TableOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} />
                                <Link 
                                    to={`${props.match.url}/shipments/new`}
                                    style={{
                                        color: "rgba(0, 0, 0, 0.65)",
                                        textDecoration: "none"
                                    }}
                                >Pickup Lists</Link></Col>
                                <Col xs="3" xl="3">{pendingView && pendingView.length}</Col>
                            </Row>
                            <Row>
                                <Col xs="9" xl="9"><LikeOutlined style={{
                                    marginRight: "15px",
                                    color: "#1890ff"
                                }} /><Link to={`${props.match.url}/shipments/delivered`} style={{
                                    color: "green"
                                }}>Delivered</Link></Col>
                                <Col xs="3" xl="3">{deliveredList && deliveredList.length}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
                        <CardBody>
                            <Row>
                                <Col xs="12" xl="12"><h5>NGN{pendingPayment && pendingPayment.toFixed(2)}</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Pending Payment</Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
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
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
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