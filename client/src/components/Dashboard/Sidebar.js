import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  DollarOutlined,
  CarOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Col, Row } from "reactstrap";

const { Sider } = Layout;

const SideBar =({ collapsed, onCollapse }) => {
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Row className="" style={{
        position: "relative",
        top: 40
      }}>
        <Col xs="3" xl="3">
            <div className="sy-side">SY</div>
        </Col>
        <Col xs="12" xl="5">
            <Row>
                <Col><p style={{
                  fontSize: 12
                }}>System Administration</p></Col>
            </Row>
            
        </Col>
    </Row>
    <div className="logo" />
    <Menu theme="dark" style={{ marginTop: 0 }} defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <DashboardOutlined />
        <span><Link to="/dashboard" style={{ color: "#fff"}}>Dashboard</Link></span>
      </Menu.Item>
      <Menu.Item key="2">
        <UsergroupAddOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/customers">Customer List</Link></span>
      </Menu.Item>
      <Menu.Item key="3">
        <CarOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/shipments">Shipment List</Link></span>
      </Menu.Item>
      <Menu.Item key="4">
        <UsergroupAddOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/users">Employee List</Link></span>
      </Menu.Item>
      <Menu.Item key="5">
        <DollarOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/transactions">Transactions</Link></span>
      </Menu.Item>
      <Menu.Item key="6">
        <FormOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/reports">Report</Link></span>
      </Menu.Item>
      <Menu.Item key="7">
        <SettingOutlined />
        <span><Link style={{ color: "#fff" }} to="/dashboard/settings">Settings</Link></span>
      </Menu.Item>
    </Menu>
  </Sider>
  )
}

export default SideBar;