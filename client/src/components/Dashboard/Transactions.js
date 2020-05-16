import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Table } from "reactstrap"
import { getShipments } from "../../store/actions/action_shipment";
import moment from "moment"

const Transactions = () => {
  const shipments = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const allShipments = shipments.shipments && shipments.shipments;
  useEffect(() => {
    dispatch(getShipments());
  }, []);

  const pendingPayment = allShipments.filter(shipment => shipment.paid === false);
  const completeTransactions = allShipments.filter(shipment => shipment.paid === true);
  const pendingPaymentList = [];

  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();
  
  let currentMonthSale = [];
  let todaySales = [];
  let monthSaleArr = [];

  for (let i = 0; i < allShipments.length; i++) {
    let eachShipment = allShipments[i];
    const todayDate = moment(today)

    if (eachShipment && eachShipment.createdAt && eachShipment.createdAt.slice(8, 10) == todayDate._i) {
      todaySales.push(eachShipment);
    }
  }

  for (let i = 0; i < allShipments.length; i++) {
      let eachShipment = allShipments[i];
      const todayMonth = moment(currentMonth);
      console.log(todayMonth, " current month")
      if (eachShipment && eachShipment.createdAt && eachShipment.createdAt.slice(5, 7) == currentMonth) {
          currentMonthSale.push(eachShipment);
      }
  }

  console.log(todaySales)
  return (
    <div>
      <Row className="mb-3">
        <Col xl="6">
          <Card>
          <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>All Transactions</h5>
            <CardBody>
              <Table hovered style={{ fontSize: 13}}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>Tracking number</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allShipments && allShipments.length > 0 ? allShipments.map(shipment => (
                    <tr key={shipment._id}>
                      <td>{shipment.companyName}</td>
                      <td>{shipment.trackingNumber}</td>
                      <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                      <td>NGN{shipment.amount}</td>
                    </tr>
                  )): <p className="text-center" style={{
                    color: "#333"
                  }}>No records found</p>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col xl="6">
          <Card>
            <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>Today Transactions</h5>
            <CardBody>
              <Table hovered style={{ fontSize: 13}}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>Tracking number</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allShipments && allShipments.length > 0 ? allShipments.map(shipment => (
                    <tr key={shipment._id}>
                      <td>{shipment.companyName}</td>
                      <td>{shipment.trackingNumber}</td>
                      <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                      <td>NGN{shipment.amount}</td>
                    </tr>
                  )): <p className="text-center" style={{
                    color: "#333"
                  }}>No records found</p>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          <Card>
          <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>Current month Transaction</h5>
            <CardBody>
              <Table hovered style={{ fontSize: 13}}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>Tracking number</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {allShipments && allShipments.length > 0 ? allShipments.map(shipment => (
                    <tr key={shipment._id}>
                      <td>{shipment.companyName}</td>
                      <td>{shipment.trackingNumber}</td>
                      <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                      <td>NGN{shipment.amount}</td>
                    </tr>
                  )): <p className="text-center" style={{
                    color: "#333"
                  }}>No records found</p>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col xl="6">
          <Card>
            <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>Pending Transactions</h5>
            <CardBody>
              <Table hovered style={{ fontSize: 13}}>
                <thead>
                  <tr>
                    <th>Company name</th>
                    <th>Tracking number</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayment && pendingPayment.length > 0 ? allShipments.map(shipment => (
                    <tr key={shipment._id}>
                      <td>{shipment.companyName}</td>
                      <td>{shipment.trackingNumber}</td>
                      <td>{moment(shipment.createdAt).format("DD/MM/YYYY")}</td>
                      <td>NGN{shipment.amount}</td>
                    </tr>
                  )): <p className="text-center" style={{
                    color: "#333"
                  }}>No records found</p>}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Transactions;