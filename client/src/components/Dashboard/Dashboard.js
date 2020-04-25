import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from 'antd';

import SideBar from "./Sidebar";
import Shipments from "./Shipments";
import ShipmentDetails from "./ShipmentDetails";
import DashboardHeader from "./Header";
import Users from "./Users";

const { Content, Footer } = Layout;

export default class Dashboard extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { match } = this.props;
    
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideBar onCollapse={this.onCollapse} collapsed={collapsed} />
        <Layout className="site-layout">
          <DashboardHeader />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 4, minHeight: 360 }}>
              <Switch>
                <Route exact path={`${match.url}`} render={(props) => <Shipments {...props} />} />
                <Route  path={`/dashboard/users`} render={(props) => <Users {...props} />} />
                <Route  path={`/dashboard/:shipmentId`} render={(props) => <ShipmentDetails {...props} />} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}