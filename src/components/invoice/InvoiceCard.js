import React from "react";
import { Card } from "semantic-ui-react";
import PropTypes from "prop-types";
import InvoiceCardHeader from "./InvoiceCardHeader";
import "../../styles/InvoiceCard.css";

const InvoiceCard = ({ data, editDatePaid, renderButtons, showMessage }) => {
  let { to, date_due, description, amount_due } = data;

  return (
    <Card className="fade">
      <Card.Content>
        <Card.Header>Invoice Details</Card.Header>
      </Card.Content>
      <Card.Content>
        <InvoiceCardHeader header="To" feed={to} />
        <InvoiceCardHeader header="Date Due" feed={date_due} />
        <InvoiceCardHeader header="Date Paid" feed={editDatePaid()} />
        <InvoiceCardHeader header="Description" feed={description} />
        <InvoiceCardHeader header="Amount Due" feed={`£${amount_due}`} />
      </Card.Content>
      <Card.Content extra>{renderButtons()}</Card.Content>
      {showMessage()}
    </Card>
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
    amount_due: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired
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
