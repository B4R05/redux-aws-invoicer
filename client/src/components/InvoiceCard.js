import React from "react";
import PropTypes from "prop-types";
import InvoiceCardHeader from "./InvoiceCardHeader";

const InvoiceCard = ({ data, editDatePaid, renderButtons, showMessage }) => {
  let { to, date_due, description, amount_due } = data;

  return (
    <div className="ui card fade">
      <div className="content">
        <div className="header">Invoice Details</div>
      </div>
      <div className="content">
        <InvoiceCardHeader header="To" feed={to} />
        <InvoiceCardHeader header="Date Due" feed={date_due} />
        <InvoiceCardHeader header="Date Paid" feed={editDatePaid()} />
        <InvoiceCardHeader header="Description" feed={description} />
        <InvoiceCardHeader header="Amount Due" feed={`£${amount_due}`} />
      </div>
      <div className="extra content">{renderButtons()}</div>
      {showMessage()}
    </div>
  );
};

InvoiceCard.propTypes = {
  editDatePaid: PropTypes.func.isRequired,
  renderButtons: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  data: PropTypes.shape({
    to: PropTypes.string.isRequired,
    date_due: PropTypes.string.isRequired,
    date_paid: PropTypes.string,
    description: PropTypes.string.isRequired,
    amount_due: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  })
};

InvoiceCard.defaultProps = {
  data: {
    to: "Unknown company",
    date_due: "Due Date unknown",
    date_paid: "Date Paid unknown",
    description: "No description entered",
    amount_due: "No amount due entered"
  }
};

export default InvoiceCard;
