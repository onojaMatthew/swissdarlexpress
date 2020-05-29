import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { getUsers, role, deleteUser } from "../../store/actions/action_user";
import { Spin, message } from "antd";
import { localAuth } from "../../helper/authentcate";
import { DeleteOutlined } from "@ant-design/icons";

const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const userRole = localAuth().user && localAuth().user.role;
  
  const error = (msg) => {
    message.error(msg);
  }

  const success = (msg) => {
    message.success(msg);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [ dispatch ]);

  useEffect(() => {
    if (users.error) {
      error(users.error);
    } else if (users.deleteSuccess === true) {
      success("User deleted!");
    } else if (users.roleSuccess === true) {
      success("User role updated");
    }
  }, [ users ]);

  const onRoleChange = (id) => {
    dispatch(role(id));
  }

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  }

  const userList = users.users && users.users;

  return (
    <div style={{ position: "relative"}}>
      <Row className="justify-content-center">
        <Col xs="12" xl="12">
          {users.getLoading === true ? (
            <div className="text-center" style={{
              position: "absolute",
              left: "50%"
            }}>
              <Spin tip="Loading..." />
            </div>
          ) : (
            <Card style={{ minHeight: 450 }}>
              <CardBody>
                {users.getLoading === true ? <Spin tip="Loading..." /> : (
                  <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      {userRole === "super_admin" ? (<th>Action</th>): null}
                    </tr>
                  </thead>
                  <tbody>
                  {userList && userList.length > 0 ? userList.map(user => (
                    <tr key={user._id}>
                      <td style={{ fontSize: 10 }}>{user.fullname}</td>
                      <td style={{ fontSize: 10 }}>{user.email}</td>
                      <td style={{ fontSize: 10 }}>{user.phone}</td>
                      {userRole !== "super_admin" ? null : (
                        <td>
                          {users.deleteLoading === true ? <Spin /> : <DeleteOutlined onClick={() => onDelete(user._id)} style={{ marginLeft: 20, color: "#ff0000" }} title="Delete user" />}
                        </td>
                      )}
                      
                    </tr>
                  )) : 
                    <div className="text-center">
                      <p style={{
                        fontSize: 24
                      }}>No records found</p>
                    </div>
                  }
                  </tbody>
                </Table>
                )}
              </CardBody>
            </Card>
          )}
          <Row>
            <Col xs="12" xl="12">

            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Users;