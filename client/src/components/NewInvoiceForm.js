import React from "react";
import PropTypes from "prop-types";

const NewInvoiceForm = ({
  parentState,
  assess,
  textInput,
  textArea,
  dateDue,
  datePaid,
  amountDue,
  showMessage
}) => {
  let {
    to_error,
    to_value,
    invalid_date_due_value,
    date_due_value,
    invalid_date_paid_value,
    date_paid_value,
    description_error,
    description_value,
    invalid_amount_due,
    amount_due_value,
    loading
  } = parentState;

  return (
    <div className="ui container segment fade very padded">
      <h2 className="ui header center aligned">New Invoice</h2>
      <form className="ui form" onSubmit={assess}>
        <div className={`field ${to_error && "error"}`}>
          <label>To:</label>
          <input
            type="text"
            placeholder="Enter the name of the customer"
            value={to_value}
            onChange={textInput}
          />
        </div>
        <div className={`field ${invalid_date_due_value && "error"}`}>
          <label>Date Due:</label>
          <input
            type="date"
            min="2008-01-01"
            max="2098-12-31"
            placeholder="Enter the date the invoice should be paid"
            value={date_due_value}
            onChange={dateDue}
          />
        </div>
        <div className={`field ${invalid_date_paid_value && "error"}`}>
          <label>Date Paid:</label>
          <input
            type="date"
            min="2008-01-01"
            max="2098-12-31"
            placeholder="Enter the date the invoice was paid"
            value={date_paid_value}
            onChange={datePaid}
          />
        </div>
        <div className={`field ${description_error && "error"}`}>
          <label>Description:</label>
          <textarea
            rows="2"
            placeholder="Add a description of the service the invoice is for"
            value={description_value}
            onChange={textArea}
          />
        </div>
        <div className={`field ${invalid_amount_due && "error"}`}>
          <label>Amount due GBP:</label>
          <input
            type="text"
            maxLength="7"
            placeholder="Enter the invoice value"
            value={isNaN(amount_due_value) ? "" : amount_due_value}
            onChange={amountDue}
          />
        </div>
        <button
          className={`ui basic ${loading ? "loading" : ""} button`}
          type="submit"
        >
          Submit
        </button>
      </form>
      {showMessage()}
    </div>
  );
};

NewInvoiceForm.propTypes = {
  parentState: PropTypes.object.isRequired,
  assess: PropTypes.func.isRequired,
  textInput: PropTypes.func.isRequired,
  textArea: PropTypes.func.isRequired,
  dateDue: PropTypes.func.isRequired,
  datePaid: PropTypes.func.isRequired,
  amountDue: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired
};

export default NewInvoiceForm;
