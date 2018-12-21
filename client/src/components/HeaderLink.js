import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderLink = ({ to, location }) => {
  return (
    <Link to={to} className="ui primary basic button ">
      {location}
    </Link>
  );
};

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default HeaderLink;
