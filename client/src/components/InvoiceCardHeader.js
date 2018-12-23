import React from "react";
import PropTypes from "prop-types";

const InvoiceCardHeader = ({ header, feed }) => {
  return (
    <React.Fragment>
      <h4 className="ui sub header">{header}</h4>
      <div className="ui small feed">{feed}</div>
    </React.Fragment>
  );
};

InvoiceCardHeader.propTypes = {
  header: PropTypes.string.isRequired,
  feed: PropTypes.any.isRequired
};

export default InvoiceCardHeader;
