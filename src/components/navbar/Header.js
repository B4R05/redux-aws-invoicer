import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import HeaderLink from "./HeaderLink";
import { newInvoice, getToken } from "../../actions/index";
import { connect } from "react-redux";
import { Container, Segment, Button } from "semantic-ui-react";

const Header = props => {
  return (
    <Container>
      {props.token.length && (
        <Segment inverted textAlign="right" style={{ marginBottom: "1rem" }}>
          <HeaderLink to="/invoices" location="Invoices" color="red" />

          <Link
            to={{ pathname: "/invoices/new" }}
            onClick={() => {
              props.newInvoice();
            }}
          >
            <Button color="teal">Add Invoice</Button>
          </Link>
          <HeaderLink to="/" location="Dashboard" color="yellow" />

          <Button
            color="purple"
            onClick={() => {
              props.getToken("");
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

Header.propTypes = {
  newInvoice: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    token: state.authToken
  };
};

export default connect(
  mapStateToProps,
  { newInvoice, getToken }
)(withRouter(Header));
