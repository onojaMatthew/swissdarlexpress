import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../../store/actions/action_shipment";
import { Table, Row, Col, Card, CardBody, Badge } from 'reactstrap';
import { message, Spin,  } from "antd";
import Paginations from "../pages/Pagination";
import { localAuth } from "../../helper/authentcate";
import ModalTemplate from "../pages/Modal";
import PrealertUpdate from "./PrealertUpdate";


const PreAlertShipments = (props) => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const [ view, setView ] = useState(false);
  const [ id, setId ] = useState("");
  const prealert = shipment.shipments && shipment.shipments.filter(shipment => shipment.status === "pending");
  const error = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    dispatch(getShipments());
  }, [ dispatch ]);

  useEffect(() => {
    setData(prealert);
  }, [ shipment ]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  useEffect(() => {
    if (shipment.error) {
      error(shipment.error);
    }
  }, [ shipment ]);

  const toggleview = (id) => {
    setId(id);
    setView(true);
  }

  const dataSource = prealert;
  
  return (
    <div>
      {view === true ? <PrealertUpdate id={id} /> : (
        <Row className="justify-content-center">
        <Col xs="10" xl="12">
          <Card style={{ minHeight: 450 }}>
            <h5 style={{
              color: "#1890ff",
              padding: "10px"
            }}>Pre Alert Shipments</h5>
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
              <Table hover>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Company Name</th>
                    <th>Contact Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tracking Number</th>
                    <th>Delivery Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageOfItems && pageOfItems.length > 0 ? pageOfItems.map((data, i) => (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td style={{ fontSize: 10 }}>{data.companyName}</td>
                      <td style={{ fontSize: 10 }}>{data.contactFName} {data.contactLName}</td>
                      <td style={{ fontSize: 10 }}>{data.email}</td>
                      <td style={{ fontSize: 10 }}>{data.phone}</td>
                      <td style={{ fontSize: 10 }}>{data.trackingNumber}</td>
                      <td>
                        {data.status === "delivered_to_driver" ? "Deliver to driver" : data.status === "delivered_to_receiver" ? "Delivered to receiver" : data.status === "returned" ? "Returned" : data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                      </td>
                      <td style={{ fontSize: 10 }}>
                        <span>{data.isView === false ? <Badge color="success">New</Badge> : null}</span> <span style={{
                          color: "",
                          cursor: "pointer"
                        }} onClick={() => toggleview(data._id)}>View</span>
                      </td>
                    </tr>
                  )) : <p className="text-center" style={{ color: "#333" }}>No records found</p>}
                </tbody>
              </Table>
              {dataSource && dataSource.length > 0 ? (
                <Paginations
                  items={data}
                  onChangePage={onChangePage}
                />
              ) : null}
              </>
            )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      )}
    </div>
  )
}

export default PreAlertShipments;