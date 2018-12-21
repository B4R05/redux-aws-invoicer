import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Invoice = props => {
  let { to, date_due, date_paid, description, amount_due, _id } = props.data;

  return (
    <tr>
      <td data-label="To">{to}</td>
      <td data-label="Date Due">{date_due}</td>
      <td data-label="Date Paid">{date_paid === "" ? "-" : date_paid}</td>
      <td data-label="Description">{description}</td>
      <td data-label="Amount Due">£{amount_due}</td>
      <td
        data-label="Status"
        className={date_paid === "" ? "negative" : "positive"}
      >
        <strong>{date_paid === "" ? "Pending" : "Paid"}</strong>
      </td>
      <td data-label="Edit Invoice">
        <Link
          to={{
            pathname: `/invoices/${_id}`,
            props
          }}
          className="ui primary button"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

Invoice.propTypes = {
  data: PropTypes.shape({
    to: PropTypes.string.isRequired,
    date_due: PropTypes.string.isRequired,
    date_paid: PropTypes.string,
    description: PropTypes.string.isRequired,
    amount_due: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })
};

Invoice.defaultProps = {
  data: {
    to: "Unknown company",
    date_due: "Due Date unknown",
    date_paid: "Date Paid unknown",
    description: "No description entered",
    amount_due: "No amount due entered",
    _id: "No id entered"
  }
};

export default Invoice;
