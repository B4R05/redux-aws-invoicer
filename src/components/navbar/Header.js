import React from "react";
import { withRouter } from "react-router-dom";
import HeaderLink from "./HeaderLink";
import { userPool } from "../../config";
import { Container, Segment, Button } from "semantic-ui-react";

const Header = props => {
  return (
    <Container>
      {userPool.getCurrentUser() && (
        <Segment inverted textAlign="right" style={{ marginBottom: "1rem" }}>
          <HeaderLink to="/invoices" location="Invoices" color="red" />
          <HeaderLink to="/invoices/new" location="New Invoice" color="teal" />
          <HeaderLink to="/" location="Dashboard" color="yellow" />
          <Button
            inverted
            color="purple"
            onClick={() => {
              userPool.getCurrentUser().signOut();
              props.history.push("/signin");
            }}
          >
            Log Out
          </Button>
        </Segment>
      )}
    </Container>
  );
};

export default withRouter(Header);
