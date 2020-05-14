import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row, Input, Table } from "reactstrap";
import { Spin, Button } from "antd";
import { DeleteOutlined, EditOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createUnit, getUnit, updateUnit, deleteUnit } from "../../store/actions/action_units";
import { message } from 'antd';

const Settings = () => {
  const units = useSelector(state => state.units);
  const dispatch = useDispatch();
  const [ amount, setAmount ] = useState("");
  const [ errors, setErrors ] = useState("");
  const [ unit, setUnit ] = useState("");
  const [ edit, setEdit ] = useState(false);
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

  const info = (msg) => {
    message.success(msg);
  };

  const error = (err) => {
    message.error(err)
  }

  useEffect(() => {
    dispatch(getUnit())
  }, [ dispatch ]);

  useEffect(() => {
    if (units.error) {
      error(units.error);
    } else if (units.updateSuccess === true) {
      info("Updated successfully")
    } else if (units.deleteSuccess === true) {
      info("Deleted successfully")
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
                    <label htmlFor="unit">Password</label>
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
                        onClick={(e) => handleUpdate(e)}
                      >Edit</Button>
                      )}
                      <ArrowLeftOutlined size="large" onClick={() => setEdit(false)} /> Back 
                    </Col>
                  </Row>
                </>
              ) : (
                <Table className="hovered">
                <thead>
                  <tr>
                    <th>Unit</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
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
                      <td>
                        {units.deleteLoading === true ? <Spin tip="Processing..." /> : <DeleteOutlined onClick={() => handleDelete(unit._id)} style={{ color: "#ff0000", cursor: "pointer" }} />}
                      </td>
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