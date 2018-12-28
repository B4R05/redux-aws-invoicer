import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderLink = ({ to, location }) => {
  return (
    <Button as={Link} to={to}>
      {location}
    </Button>
  );
};

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default HeaderLink;
