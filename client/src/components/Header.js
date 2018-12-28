import React from "react";
import HeaderLink from "./HeaderLink";

import { Container, Segment } from "semantic-ui-react";

const Header = () => {
  return (
    <Container>
      <Segment textAlign="right" style={{ marginBottom: "1rem" }}>
        <HeaderLink to="/invoices" location="Invoices" />
        <HeaderLink to="/invoices/new" location="New Invoice" />
        <HeaderLink to="/" location="Dashboard" />
      </Segment>
    </Container>
  );
};

export default Header;
