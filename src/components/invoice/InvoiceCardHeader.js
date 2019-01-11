import React from "react";
import { Header, Feed } from "semantic-ui-react";
import PropTypes from "prop-types";

const InvoiceCardHeader = ({ header, feed }) => {
  return (
    <React.Fragment>
      <Header as="h4" sub>
        {header}
      </Header>
      <Feed size="small">{feed}</Feed>
    </React.Fragment>
  );
};

InvoiceCardHeader.propTypes = {
  header: PropTypes.string.isRequired,
  feed: PropTypes.any.isRequired
};

export default InvoiceCardHeader;
