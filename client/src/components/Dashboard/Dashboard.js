import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Breadcrumb } from 'antd';

import SideBar from "./Sidebar";
import Shipments from "./Shipments";
import ShipmentDetails from "./ShipmentDetails";
import DashboardHeader from "./Header";
import Users from "./Users";
import DashboardHome from "./DashboardHome";
import DelayedShipments from "./DelayedShipment";
import PreAlertShipments from "./PreAlert";
import DeliveredList from "./DeliveredList";
import NewShipmentList from "./NewShipmentList";
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
                <Route exact path={`${match.url}`} render={(props) => <DashboardHome {...props} />} />
                <Route exact path={`${match.url}/shipments`} render={(props) => <Shipments {...props} />} />
                <Route exact path={`${match.url}/users`} render={(props) => <Users {...props} />} />
                <Route path={`${match.url}/shipments/prealert`} render={(props) => 
                <PreAlertShipments {...props} />} />
                <Route exact path={`${match.url}/shipments/delayed`} render={(props) => 
                <DelayedShipments {...props} />} />
                <Route exact path={`${match.url}/shipments/new`} render={(props) => <NewShipmentList {...props} />} />
                <Route exact path={`${match.url}/shipments/delivered`} render={(props) => 
                <DeliveredList  {...props}/>} />
                <Route  path={`${match.url}/shipments/:shipmentId`} render={(props) => <ShipmentDetails {...props} />} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    )
  }
}