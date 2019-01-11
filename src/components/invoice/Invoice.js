import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";

const Invoice = ({ data }) => {
  let { to, date_due, date_paid, description, amount_due, id } = data;

  return (
    <Table.Row className="fade">
      <Table.Cell>{to}</Table.Cell>
      {date_paid === "-" ? (
        <Table.Cell negative>
          <strong>Pending</strong>
        </Table.Cell>
      ) : (
        <Table.Cell positive>
          <strong>Paid</strong>
        </Table.Cell>
      )}
      <Table.Cell>{date_due}</Table.Cell>
      <Table.Cell>{date_paid}</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>
        <strong>£{amount_due}</strong>
      </Table.Cell>

      <Table.Cell>
        <Link
          to={{
            pathname: `/invoices/${id}`,
            data
          }}
        >
          <Button color="blue">View</Button>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

Invoice.propTypes = {
  data: PropTypes.shape({
    to: PropTypes.string.isRequired,
    date_due: PropTypes.string.isRequired,
    date_paid: PropTypes.string,
    description: PropTypes.string.isRequired,
    amount_due: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
  })
};

Invoice.defaultProps = {
  data: {
    to: "Unknown company",
    date_due: "Due Date unknown",
    date_paid: "Date Paid unknown",
    description: "No description entered",
    amount_due: "No amount due entered",
    id: "No id entered"
  }
};

export default Invoice;
