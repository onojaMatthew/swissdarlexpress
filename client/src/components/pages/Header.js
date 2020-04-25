import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavbarText
} from 'reactstrap';
import Logo from "../../assets/logo-dark.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const styles = {
    link: {
      color: "#fff"
    }
  }

  return (
    <div>
      <Navbar className="light" expand="md">
        <Container>
        <NavbarBrand style={styles.link} href="/">
          <img src={Logo} alt="Logo" height="50" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} style={{ background: "#fff"}}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          
          </Nav>
          <NavbarText>
            <NavLink style={{
              color: "#fff",
              border: "1px solid #fff",
              padding: 5
            }} href="/request">
              Request Quote
            </NavLink>
          </NavbarText>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;