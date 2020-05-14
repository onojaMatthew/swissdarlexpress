import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Layout } from "antd";
import Auth from "../../helper/Auth";
import { localAuth } from "../../helper/authentcate";
import { LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { logout } from "../../store/actions/action_user";
import { Col, Row } from "reactstrap";
import Flag from "../../assets/ngn-flag.jpg";

const { Header } = Layout;

const DashboardHeader = () => {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const username = localAuth().user && localAuth().user.fullname
  const onLogout = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (user.logoutSuccess === true) {
      Auth.deauthenticateUser();
      window.location.href = "/accountl";
    }
  }, [ user ]);
  return (
    <>
    <Header className="site-layout-background">
      <Row>
        <Col xs="12" xl="6">
          <ClockCircleOutlined style={{
            color: "#fff",
            fontSize: "25px"
          }} /> <span style={{ color: "#fff", marginLeft: 15 }}>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
        </Col>
        <Col xs="12" xl="6">
          <div className="text-right" style={{
              color: "#fff"
            }}
          >
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