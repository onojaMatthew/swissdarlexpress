import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CarOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const SideBar =({ collapsed, onCollapse }) => {
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" style={{ marginTop: 60 }} defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <DashboardOutlined />
            <span><Link to="/dashboard" style={{ color: "#fff"}}>Dashboard</Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <CarOutlined />
            <span><Link style={{ color: "#fff" }} to="/dashboard">Shipments</Link></span>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
            <span><Link style={{ color: "#fff" }} to="/dashboard/users">Users</Link></span>
          </Menu.Item>
        </Menu>
      </Sider>
  )
}

export default SideBar;