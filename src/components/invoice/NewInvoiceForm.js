import React from "react";
import { Container, Segment, Header, Form, Button } from "semantic-ui-react";
import DatePicker from "react-date-picker";
import PropTypes from "prop-types";
import "../../styles/NewInvoiceForm.css";

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
    <Container className="fade">
      <Segment inverted id="newinvoice-form">
        <Header as="h2" textAlign="center">
          New Invoice
        </Header>
        <Form inverted onSubmit={assess}>
          <Form.Field error={to_error && true}>
            <Form.Input
              label="To"
              type="text"
              placeholder="Enter the name of the customer"
              value={to_value}
              onChange={textInput}
            />
          </Form.Field>

          <Form.Field error={invalid_date_due_value && true}>
            <label>Date Due</label>
            <DatePicker onChange={dateDue} value={date_due_value} />
          </Form.Field>

          <Form.Field error={invalid_date_paid_value && true}>
            <label>Date Paid</label>
            <DatePicker onChange={datePaid} value={date_paid_value} />
          </Form.Field>

          <Form.Field error={description_error && true}>
            <Form.TextArea
              label="Description"
              placeholder="Add a description of the service the invoice is for"
              value={description_value}
              onChange={textArea}
            />
          </Form.Field>

          <Form.Field error={invalid_amount_due && true}>
            <Form.Input
              label="Amount due GBP"
              type="text"
              maxLength="7"
              placeholder="Enter the invoice value"
              value={isNaN(amount_due_value) ? "" : amount_due_value}
              onChange={amountDue}
            />
          </Form.Field>

          <Button inverted color="grey" loading={loading && true} type="submit">
            Submit
          </Button>
        </Form>
        {showMessage()}
      </Segment>
    </Container>
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
