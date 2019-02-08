import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const HeaderLink = ({ to, location, color }) => {
  return (
    <Button color={color} as={Link} to={to}>
      {location}
    </Button>
  );
};

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.string,
  color: PropTypes.string
};

export default HeaderLink;
