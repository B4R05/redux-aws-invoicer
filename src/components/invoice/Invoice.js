import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectedInvoice } from "../../actions/index";

const Invoice = props => {
  let { from, to, orderStatus, TotalCost, InvoiceID } = props.data;

  return (
    <Table.Row className="fade">
      <Table.Cell>{InvoiceID}</Table.Cell>
      {orderStatus === "Pending" ? (
        <Table.Cell negative>
          <strong>Pending</strong>
        </Table.Cell>
      ) : (
        <Table.Cell positive>
          <strong>Paid</strong>
        </Table.Cell>
      )}
      <Table.Cell>{from}</Table.Cell>
      <Table.Cell>{to}</Table.Cell>
      <Table.Cell>
        <strong>£{TotalCost}</strong>
      </Table.Cell>

      <Table.Cell>
        <Link
          to={{ pathname: `/invoices/edit/${InvoiceID}` }}
          onClick={() => {
            props.selectedInvoice(InvoiceID);
          }}
        >
          <Button color="blue">View</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

Invoice.propTypes = {
  selectedInvoice: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default connect(
  null,
  { selectedInvoice }
)(withRouter(Invoice));
