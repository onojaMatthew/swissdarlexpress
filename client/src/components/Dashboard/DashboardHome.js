import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Divider } from "antd";
import { MailOutlined, UserOutlined, TableOutlined, PhoneOutlined, LikeOutlined, ExclamationCircleOutlined, SnippetsOutlined, CheckSquareOutlined, CheckCircleOutlined, CarOutlined, StockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getShipments } from "../../store/actions/action_shipment";
import { localAuth } from "../../helper/authentcate";
import Chart from "../pages/Chart";
import PercentageChart from "../pages/PercentageChart";

const DashboardHome = (props) => {
    const shipments = useSelector(state => state.shipment);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getShipments());
    }, [ dispatch ]);


    const shipmentList = shipments.shipments && shipments.shipments.length;
    const allShipment = shipments.shipments;
    const deliveredList = allShipment.filter(shipment => shipment.status === "delivered_to_receiver");
    const pendingView = allShipment.filter(shipment => shipment.isView === false);
    const unpaidDeliveryList = allShipment.filter(shipment => shipment.paid === false);
    const approvedList = allShipment.filter(shipment => shipment.status !== "pending");
    const pendingShipments = allShipment.filter(shipment => shipment.status === "pending");
    const delayedShipments = allShipment.filter(shipment => shipment.status === "delayed");
    const pendingPaymentList = [];
    const currentMonth = new Date().getMonth();
    const toTwoDigits = currentMonth.length === 2 ? 1 + currentMonth : "0" + (1 + currentMonth) ;
    let currentMonthSale = [];
    let monthSaleArr = [];
    for (let i = 0; i < unpaidDeliveryList.length; i++) {
        pendingPaymentList.push(unpaidDeliveryList[i].amount);
    }

    for (let i = 0; i < allShipment.length; i++) {
        let eachShipment = allShipment[i];
        if (eachShipment && eachShipment.createdAt && eachShipment.createdAt.slice(5, 7) == toTwoDigits) {
            currentMonthSale.push(eachShipment);
        }
    }

    for (let i = 0; i < currentMonthSale.length; i++) {
        // monthSaleArr.push({amount: currentMonthSale[i].amount, name: "Current month sale"});
        monthSaleArr.push(currentMonthSale[i].amount);
    }

    const amt = monthSaleArr.map(amount => amount.amount)
    const currentMonthAmt = monthSaleArr.reduce((a, b) => a + b, 0);
    const userEmail = localAuth().user && localAuth().user.email;
    const pendingPayment = pendingPaymentList.reduce((a, b) => a + b, 0);
    console.log(delayedShipments && delayedShipments.length * 100);
    const delayPercent = (delayedShipments.length * 100) / allShipment.length;
    return (
        <div>
            <Card className="mb-3">
                <CardBody>
                    <Row>
                        <Col xs="3" xl="1">
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
                                }}/>{"General Manager"}</Col>
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
                                    <span style={{ fontSize: 12, color: "#333" }}><Link to="/dashboard/shipments/new">View</Link></span>
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
                                    marginRight: "6px",
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
                                    marginRight: "6px",
                                    color: "#1890ff"
                                }} />
                                <Link 
                                    to={`${props.match.url}/shipments/delayed`}
                                    style={{
                                        color: "red",
                                        textDecoration: "none"
                                    }}
                                >Delayed Shipments</Link></Col>
                                <Col xs="3" xl="3">{delayedShipments && delayedShipments.length}</Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><PhoneOutlined style={{
                                    marginRight: "6px",
                                    color: "#1890ff"
                                }} /><Link to={`${props.match.url}/shipments/prealert`} style={{
                                    color: "orange",
                                    textDecoration: "none"
                                }}>Pre Alert to Approve</Link></Col>
                                <Col xs="3" xl="3">{pendingShipments && pendingShipments.length}</Col>
                            </Row>
                            <Row className="mb-4">
                                <Col xs="9" xl="9"><TableOutlined style={{
                                    marginRight: "6px",
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
                                    marginRight: "6px",
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
                                <Col xs="12" xl="12"><h5 style={{
                                    color: "#1890ff"
                                }}>NGN{pendingPayment && pendingPayment.toFixed(2)}</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Pending Payment</Col>
                            </Row>
                        </CardBody>
                        <Chart monthSaleArr={pendingPaymentList} color="#1890ff" label="Pending payment" />
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
                        <CardBody>
                            <Row>
                            <Col xs="12" xl="12"><h5 style={{
                                color: "orange"
                            }}>NGN{currentMonthAmt && currentMonthAmt.toFixed(2)}</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Current Month Sales</Col>
                            </Row>
                        </CardBody>
                        <Chart monthSaleArr={monthSaleArr} color="orange" label="Current month sale" />
                    </Card>
                </Col>
                <Col xs="12" xl="3">
                    <Card style={{ minHeight: 400 }}>
                        <CardBody>
                            <Row>
                            <Col xs="12" xl="12"><h5 style={{ color: "red"}}>{delayPercent ? delayPercent : 0}%</h5></Col>
                            </Row>
                            <Row>
                                <Col xs="12" xl="12">Delayed Shipping Percentagge</Col>
                            </Row>
                        </CardBody>
                        <PercentageChart delayedShipments={delayedShipments} perce={delayPercent} color="red" label={"Delayed shipping %"} />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardHome;