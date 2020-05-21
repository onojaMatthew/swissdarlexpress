import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Layout, Spin } from "antd";
import Auth from "../../helper/Auth";
import { localAuth } from "../../helper/authentcate";
import { LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { logout } from "../../store/actions/action_user";
import { getShipments } from "../../store/actions/action_shipment";
import { Col, Row, Badge } from "reactstrap";
import Flag from "../../assets/ngn-flag.jpg";

const { Header } = Layout;

const DashboardHeader = () => {
  const user = useSelector((state) => state.users);
  const shipments = useSelector(state => state.shipment);
  const dispatch = useDispatch();
  const username = localAuth().user && localAuth().user.fullname;
  const newShipments = shipments.shipments && shipments.shipments.filter(shipment => shipment.isView === false);
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (user.logoutSuccess === true) {
      Auth.deauthenticateUser();
      window.location.href = "/accountl";
    }
  }, [ user ]);

  useEffect(() => {
    dispatch(getShipments())
  }, [ dispatch ]);

  return (
    <>
    <Header className="site-layout-background">
      <Row>
        <Col xs="12" xl="5">
          <ClockCircleOutlined style={{
            color: "#fff",
            fontSize: "25px"
          }} /> <span style={{ color: "#fff", marginLeft: 15 }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
        </Col>
        <Col xs="12" xl="7">
          <div className="text-right" style={{
              color: "#fff"
            }}
          >
            <span style={{ marginRight: 25}}>
              {newShipments && newShipments.length > 0 ? (
                <a href="/dashboard/shipments/new">
                  <Badge style={{
                    position: "relative",
                    top: "-15px",
                    left: 25,
                    background: "red",
                    borderRadius: 25,
                    padding: 5,
                    width: 20,
                    height: 20
                  }}>
                    {newShipments && newShipments.length}
                  </Badge>
                </a>
              ) : null}
              
              <Spin />
            </span>
            
            <img src={Flag} alt="flag" style={{ 
                width: 23, height: 20,
                marginRight: 17
              }} 
            />
            <span>Hi, {username}</span> <LogoutOutlined style={{ marginLeft: "15px", marginRight: 10 }} onClick={() => onLogout()} /><span className="sy-header">SY</span>
          </div>
        </Col>
      </Row>
    </Header>
    <Header className="site-layout-background" style={{ background: "#fff" }}>
      <Row>
        <Col xs="12" xl="6">
          <span style={{ color: "#333" }}><strong>Dashboard</strong> <span style={{
            marginLeft: "15px"
          }}>Overview on your system |</span></span>
        </Col>
        <Col xs="12" xl="6">
          
        </Col>
      </Row>
    </Header>
    </>
  );
}

export default DashboardHeader;