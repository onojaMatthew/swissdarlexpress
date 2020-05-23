import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipments, shipmentDelete } from "../../store/actions/action_shipment";
import { Table, Row, Col, Card, CardBody, Badge } from 'reactstrap';
import { message, Spin,  } from "antd";
import { Link } from "react-router-dom";
import Paginations from "../pages/Pagination";
import { DeleteOutlined } from "@ant-design/icons";
import { localAuth } from "../../helper/authentcate";


const DelayedShipments = (props) => {
  const shipment = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);
  const delayedShipments = shipment.shipments && shipment.shipments.filter(ship => ship.status === "delayed")
  const error = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    dispatch(getShipments());
  }, [ dispatch ]);

  useEffect(() => {
    setData(delayedShipments);
  }, [shipment]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  const onDelete = (id) => {
    dispatch(shipmentDelete(id));
  }

  useEffect(() => {
    if (shipment.error) {
      error(shipment.error);
    }
  }, [ shipment ]);

  const dataSource = delayedShipments;
  
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="10" xl="12">
          <Card style={{ minHeight: 450 }}>
            <h5 style={{
              color: "#1890ff",
              padding: "15px"
            }}>Delayed Shipments</h5>
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
              <Table responsive hover>
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
                  {pageOfItems && pageOfItems.length > 0 ? pageOfItems.map((data, i) => (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td style={{ fontSize: 10 }}>{data.companyName}</td>
                      <td style={{ fontSize: 10 }}>{data.contactFName} {data.contactLName}</td>
                      <td style={{ fontSize: 10 }}>{data.email}</td>
                      <td style={{ fontSize: 10 }}>{data.phone}</td>
                      <td style={{ fontSize: 10 }}>{data.trackingNumber}</td>
                      <td style={{ fontSize: 10 }}>{data.status}</td>
                      <td style={{ fontSize: 10 }}>
                        <span>{data.isView === false ? <Badge color="success">New</Badge> : null}</span> <Link to={`/dashboard/shipments/${data._id}`}>View</Link> 
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
      
    </div>
  )
}

export default DelayedShipments;