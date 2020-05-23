import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Card, 
  CardBody, 
  Col, 
  Row, 
  Table,
  TabContent,
  TabPane, 
  Nav, 
  NavItem, 
  NavLink
 } from "reactstrap";
import { getShipments } from "../../store/actions/action_shipment";
import moment from "moment";
import classnames from 'classnames';


const Transactions = () => {
  const shipments = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const [ allToday, setAlltoday ] = useState(false);
  const [ allSales, setAllSales ] = useState(false);
  const [ allMonth, setAllMonth ] = useState(false);
  const [ allPending, setAllPending ] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const allShipments = shipments.shipments && shipments.shipments;


  useEffect(() => {
    dispatch(getShipments());
  }, []);

  const pendingPayment = allShipments.filter(shipment => shipment.paid === false);
  const completeTransactions = allShipments.filter(shipment => shipment.paid === true);
  const pendingPaymentList = [];

  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  
  let currentMonthTrx = [];
  let currentMonthSale = [];
  let todayTrx = [];
  let todaySales = [];
  let totalSales = [];

  for (let i = 0; i < pendingPayment.length; i++) {
    const eachPayment = pendingPayment[i];
    pendingPaymentList.push(eachPayment.amount);
  }

  for (let i = 0; i < allShipments.length; i++) {
    let eachShipment = allShipments[i];
    totalSales.push(eachShipment.amount);
    const todayDate = moment(today)

    if (eachShipment && eachShipment.createdAt && eachShipment.createdAt.slice(8, 10) == todayDate._i) {
      todayTrx.push(eachShipment)
      todaySales.push(eachShipment.amount);
    }
  }

  for (let i = 0; i < allShipments.length; i++) {
    let eachShipment = allShipments[i];
    const todayMonth = moment(currentMonth);
    if (eachShipment && eachShipment.createdAt && eachShipment.createdAt.slice(5, 7) == currentMonth) {
      currentMonthTrx.push(eachShipment);
      currentMonthSale.push(eachShipment.amount);
    }
  }

  const dailySales = todaySales.reduce((a, b) => a + b, 0);
  const monthlySales = currentMonthSale.reduce((a, b) => a + b, 0);
  const total = totalSales.reduce((a, b) => a + b, 0);
  const pendingSales = pendingPaymentList.reduce((a, b) => a + b, 0);
  const todaySlice = todayTrx && todayTrx.slice(0, 3);
  const monthSlice = currentMonthTrx.slice(0, 3);
  const allSlice = allShipments.slice(0, 3)
  const pendingSlice = pendingPayment.slice(0, 3);
  
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="12" xl="10">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                All Transactions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Today Transactions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
              >
                Current Transactions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '4' })}
                onClick={() => { toggle('4'); }}
              >
                Pending Transactions
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      {allSales === true ? (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allShipments && allShipments.length > 0 ? allShipments.map(shipment => (
                            <tr key={shipment._id}>
                              <td>{shipment.companyName}</td>
                              <td>{shipment.trackingNumber}</td>
                              <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                              <td>{shipment.paid === false ? "False" : "True"}</td>
                              <td>NGN{shipment.amount}</td>
                            </tr>
                          )): <p className="text-center" style={{
                            color: "#333"
                          }}>No records found</p>}
                        </tbody>
                      </Table>
                      ) : (
                        <Table responsive hovered style={{ fontSize: 12}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allSlice && allSlice.length > 0 ? allSlice.map(shipment => (
                            <tr key={shipment._id}>
                              <td>{shipment.companyName}</td>
                              <td>{shipment.trackingNumber}</td>
                              <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                              <td>{shipment.paid === false ? "False" : "True"}</td>
                              <td>NGN{shipment.amount}</td>
                            </tr>
                          )): <p className="text-center" style={{
                            color: "#333"
                          }}>No records found</p>}
                        </tbody>
                      </Table>
                      )}
                      
                      <Row>
                        <Col xl="9"><strong>Total</strong></Col>
                        <Col xl="3">NGN{total}</Col>
                      </Row>
                      {allShipments && allShipments.length > 3 ? (
                        <span style={{
                            float: "right",
                            cursor: "pointer",
                            color: "#1890ff",
                            paddingRight: 10
                          }}
                          onClick={() => setAllSales(!allSales)}
                        >{allSales === true ? "See less..." : "See more..."}</span>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      {allToday === true ? (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todayTrx && todayTrx.length > 0 ? todayTrx.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333"
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      ) : (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todaySlice && todaySlice.length > 0 ? todaySlice.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333",
                              fontSize: 14
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      )}
                      <Row>
                        <Col xl="9"><strong>Total</strong></Col>
                        <Col xl="3">NGN{ dailySales && dailySales}</Col>
                      </Row>
                      {todayTrx && todayTrx.length > 3 ? (
                        <span 
                          style={{
                            float: "right",
                            cursor: "pointer",
                            color: "#1890ff",
                            paddingRight: 10
                          }}
                          onClick={() => setAlltoday(!allToday)}
                        >{allToday === true ? "See less..." : "See more..."}</span>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      {allMonth === true ? (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentMonthTrx && currentMonthTrx.length > 0 ? currentMonthTrx.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333"
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      ) : (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {monthSlice && monthSlice.length > 0 ? monthSlice.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333",
                              fontSize: 14
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      )}
                      <Row>
                        <Col xl="9"><strong>Total</strong></Col>
                        <Col xl="3">NGN{monthlySales && monthlySales}</Col>
                      </Row>
                      {currentMonthTrx && currentMonthTrx.length > 3 ? (
                        <span 
                          style={{
                            float: "right",
                            cursor: "pointer",
                            color: "#1890ff",
                            paddingRight: 10
                          }}
                          onClick={() => setAllMonth(!allMonth)}
                        >{allMonth === true ? "See less..." : "See more..."}</span>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      {allPending === true ? (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pendingPayment && pendingPayment.length > 0 ? allShipments.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333",
                              fontSize: 14
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      ) : (
                        <Table responsive hovered style={{ fontSize: 13}}>
                          <thead>
                            <tr>
                              <th>Company name</th>
                              <th>Tracking number</th>
                              <th>Date</th>
                              <th>Paid</th>
                              <th>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pendingSlice && pendingSlice.length > 0 ? pendingSlice.map(shipment => (
                              <tr key={shipment._id}>
                                <td>{shipment.companyName}</td>
                                <td>{shipment.trackingNumber}</td>
                                <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                                <td>{shipment.paid === false ? "False" : "True"}</td>
                                <td>NGN{shipment.amount}</td>
                              </tr>
                            )): <p className="text-center" style={{
                              color: "#333",
                              fontSize: 14
                            }}>No records found</p>}
                          </tbody>
                        </Table>
                      )}
                      <Row>
                        <Col xl="9"><strong>Total</strong></Col>
                        <Col xl="3">NGN{pendingSales && pendingSales}</Col>
                      </Row>
                      {pendingPayment && pendingPayment.length > 3 ? (
                        <span
                          style={{
                            float: "right",
                            cursor: "pointer",
                            color: "#1890ff"
                          }}
                          onClick={() => setAllPending(!allPending)}
                        >{allPending === true ? "See less..." : "See more..."}</span>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default Transactions;