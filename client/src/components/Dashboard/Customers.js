import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, getCustomer } from "../../store/actions/action_customer";
import { Table, Row, Col, Card, CardBody, Badge } from 'reactstrap';
import { message, Spin,  } from "antd";
import Paginations from "../pages/Pagination";
import { DeleteOutlined } from "@ant-design/icons";
import { localAuth } from "../../helper/authentcate";


const Customers = (props) => {
  const customers = useSelector(state => state.customer);
  const dispatch = useDispatch();
  const [ pageOfItems, setPageOfItems ] = useState([]);
  const [ data, setData ] = useState([]);

  const error = (msg) => {
    message.error(msg);
  };

  useEffect(() => {
    dispatch(getCustomer());
  }, [ dispatch ]);

  useEffect(() => {
    setData(customers.customers);
  }, [customers]);

  const onChangePage = (pageOfItems) => {
    setPageOfItems(pageOfItems);
  }

  const onDelete = (id) => {
    dispatch(deleteCustomer(id));
  }

  useEffect(() => {
    if (customers.error) {
      error(customers.error);
    }
  }, [ customers ]);

  const dataSource = customers.customers && customers.customers;
  
  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="10" xl="12">
          <Card style={{ minHeight: 450 }}>
            <h5 style={{
              color: "#1890ff",
              padding: "15px"
            }}>Customers List</h5>
            <CardBody>
            {customers.loading === true ? (
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
              <Table hovered>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Company Name</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageOfItems && pageOfItems.length > 0 ? pageOfItems.map((data, i) => (
                    <tr key={data._id}>
                      <th scope="row">{i + 1}</th>
                      <td style={{ fontSize: 12 }}>{data.company}</td>
                      <td style={{ fontSize: 12 }}>{data.firstName}</td>
                      <td style={{ fontSize: 12 }}>{data.lastName}</td>
                      <td style={{ fontSize: 12 }}>{data.email}</td>
                      <td style={{ fontSize: 12 }}>{data.phone}</td>
                      <td style={{ fontSize: 12 }}>
                        {customers.loading === true ? (
                          <Spin tip="Processing..." />
                        ) : (
                          <DeleteOutlined size="large" style={{ color: "red"}} onClick={() => onDelete(data._id)}/>
                        )}
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

export default Customers;