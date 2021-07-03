import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Input, Table } from "reactstrap";
import { Spin, Button } from "antd";
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createUnit, getUnit, updateUnit, deleteUnit } from "../../store/actions/action_units";
import { localAuth } from "../../helper/authentcate";

const Settings = () => {
  const units = useSelector(state => state.units);
  const dispatch = useDispatch();
  const [ amount, setAmount ] = useState("");
  const [ errors, setErrors ] = useState("");
  const [ unit, setUnit ] = useState("");
  const [ edit, setEdit ] = useState(false);
  const [ message, setMessage ] = useState("");
  const [ id, setId ] = useState("");

  const handleChange = (e, name) => {
    e.preventDefault();
    setErrors("");
    if (name === "unit") {
      setUnit(e.target.value);
    } else {
      setAmount(e.target.value);
    }
  }

  const onPost = () => {
    const data = { unit, amount }
    dispatch(createUnit(data));
    setAmount("");
    setUnit("");
  }

  useEffect(() => {
    dispatch(getUnit())
  }, [ dispatch ]);

  useEffect(() => {
    if (units.error) {
      setErrors(units.error);
    } else if (units.updateSuccess === true) {
      setMessage("Updated successfully")
    } else if (units.deleteSuccess === true) {
      setMessage("Deleted successfully")
    }
  }, [ units ]);

  const handleDelete = (id) => {
    dispatch(deleteUnit(id));
  }

  const toggleEdit = (id) => {
    setId(id);
    setEdit(true);
  }

  const handleUpdate = () => {
    const data = { amount, unit }
    dispatch(updateUnit(id, data));
    setEdit(false)
  }

  const role = localAuth().user && localAuth().user.role;

  return (
    <div>
      <Row>
        <Col xs="12" xl="6">
          <Card className="mb-5">
            <CardBody>
              <Row>
                <Col xs="12" xl="12">
                  <h5>New unit</h5>
                </Col>
              </Row>
              <Row>
                <Col xs="12" xl="6">
                  <div className="mb-3">
                    <label htmlFor="unit">Unit</label>
                    <Input 
                      placeholder="Unit"
                      type="text"
                      value={unit}
                      id="unit"
                      onChange={(e) => handleChange(e, "unit")}
                    />
                    <span style={{ color: "#ff0000" }}>{errors["unit"]}</span>
                  </div>
                </Col>
                <Col xs="12" xl="6">
                  <div className="mb-3">
                    <label htmlFor="amount">Amount</label>
                    <Input 
                      placeholder="Amount"
                      type="text"
                      value={amount}
                      id="amount"
                      onChange={(e) => handleChange(e, "amount")}
                    />
                    <span style={{ color: "#ff0000" }}>{errors["phone"]}</span>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="12" xl="12">
                  {units.loading === true ? (
                    <div className="text-center">
                      <Spin tip="Processing..." />
                    </div>
                  ) : (
                    <Button type="primary" 
                    style={{ width: "100%",
                    background: "#1890ff"
                    }}
                    disabled={role !== "super_admin"}
                    onClick={(e) => onPost(e)}
                  >Send</Button>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" xl="6">
          <Card>
            <CardBody>
              {message.length > 0 ? <p style={{ color: "green" }}>{message}</p> : null}
              {errors.length > 0 ? <p style={{ color: "red" }}>{errors}</p> : null}
              {edit === true ? (
                <>
                  <Row>
                    <Col xs="12" xl="12">
                      <h5>Edit unit</h5>
                    </Col>
                  </Row>
                  
                  
                  <Row>
                    <Col xs="12" xl="6">
                      <div className="mb-3">
                        <label htmlFor="unit">Unit</label>
                        <Input 
                          placeholder="Unit"
                          type="text"
                          value={unit}
                          id="unit"
                          onChange={(e) => handleChange(e, "unit")}
                        />
                        <span style={{ color: "#ff0000" }}>{errors["unit"]}</span>
                      </div>
                    </Col>
                    <Col xs="12" xl="6">
                      <div className="mb-3">
                        <label htmlFor="amount">Amount</label>
                        <Input 
                          placeholder="Amount"
                          type="text"
                          value={amount}
                          id="amount"
                          onChange={(e) => handleChange(e, "amount")}
                        />
                        <span style={{ color: "#ff0000" }}>{errors["phone"]}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className="">
                    <Col xs="12" xl="12">
                      {units.updateLoading === true ? (
                        <div className="text-center">
                          <Spin tip="Processing..." />
                        </div>
                      ) : (
                        <Button type="primary" 
                        style={{ width: "100%",
                        background: "#1890ff"
                        }}
                        disabled={role !== "super_admin"}
                        onClick={(e) => handleUpdate(e)}
                      >Edit</Button>
                      )}
                      <ArrowLeftOutlined size="large" onClick={() => setEdit(false)} /> Back 
                    </Col>
                  </Row>
                </>
              ) : (
                <Table responsive hover>
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    {role === "super_admin" ? (<th>Delete</th>) : null}
                  </tr>
                </thead>
                <tbody>
                  {units.units && units.units.length > 0 ? units.units.map(unit => (
                    <tr key={unit._id}>
                      <td>{unit.unit}</td>
                      <td>{unit.amount}</td>
                      <td>
                        {units.updateLoading === true ? <Spin tip="Processing..." /> : (
                          <EditOutlined onClick={() => toggleEdit(unit._id)} style={{ color: "#1890ff" }} />
                        )}
                      </td>
                      {role === "super_admin" ? (
                        <td>
                          {units.deleteLoading === true ? <Spin tip="Processing..." /> : <DeleteOutlined onClick={() => handleDelete(unit._id)} style={{ color: "#ff0000", cursor: "pointer" }} />}
                        </td>
                      ) : null}
                    </tr>
                  )): <p style={{ color: "#333"}}>No records</p>}
                </tbody>
              </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div>
  );
}

export default Settings;