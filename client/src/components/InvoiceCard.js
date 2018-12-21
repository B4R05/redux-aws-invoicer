import React from "react";
import PropTypes from "prop-types";

const InvoiceCard = ({ data, editDatePaid, renderButtons, showMessage }) => {
  let { to, date_due, description, amount_due } = data;

  return (
    <div className="ui card fade">
      <div className="content">
        <div className="header">Invoice Details</div>
      </div>
      <div className="content">
        <h4 className="ui sub header">To</h4>
        <div className="ui small feed">{to}</div>
        <h4 className="ui sub header">Date Due</h4>
        <div className="ui small feed">{date_due}</div>
        <h4 className="ui sub header">Date Paid</h4>
        <div className="ui small feed">{editDatePaid()}</div>
        <h4 className="ui sub header">Description</h4>
        <div className="ui small feed">{description}</div>
        <h4 className="ui sub header">Amount Due</h4>
        <div className="ui small feed">£{amount_due}</div>
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
    amount_due: "No amount due entered",
    _id: "No id entered"
  }
};

export default InvoiceCard;
