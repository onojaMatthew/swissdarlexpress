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
  const [ single, setSingle ] = useState({});
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
  }, [shipment]);

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
  console.log(single, " the single shipment")
  
  return (
    <div>
      {view === true ? <PrealertUpdate id={id} single={single} /> : (
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
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageOfItems ? pageOfItems.map((data, i) => (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td style={{ fontSize: 10 }}>{data.companyName}</td>
                      <td style={{ fontSize: 10 }}>{data.contactFName} {data.contactLName}</td>
                      <td style={{ fontSize: 10 }}>{data.email}</td>
                      <td style={{ fontSize: 10 }}>{data.phone}</td>
                      <td style={{ fontSize: 10 }}>{data.trackingNumber}</td>
                      <td style={{ fontSize: 10 }}>{data.delivered === false ? "Pending" : "Delivered"}</td>
                      <td style={{ fontSize: 10 }}>
                        <span>{data.isView === false ? <Badge color="success">New</Badge> : null}</span> <span style={{
                          color: "",
                          cursor: "pointer"
                        }} onClick={() => toggleview(data._id)}>View</span>
                      </td>
                    </tr>
                  )) : "No records found"}
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