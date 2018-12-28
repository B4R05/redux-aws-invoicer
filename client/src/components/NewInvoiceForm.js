import React from "react";
import { Container, Segment, Header, Form, Button } from "semantic-ui-react";
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
    <Container className="fade">
      <Segment>
        <Header as="h2" textAlign="center">
          New Invoice
        </Header>
        <Form onSubmit={assess}>
          <Form.Field error={to_error && true}>
            <Form.Input
              label="To:"
              type="text"
              placeholder="Enter the name of the customer"
              value={to_value}
              onChange={textInput}
            />
          </Form.Field>

          <Form.Field error={invalid_date_due_value && true}>
            <Form.Input
              label="Date Due:"
              type="date"
              min="2008-01-01"
              max="2098-12-31"
              placeholder="Enter the date the invoice should be paid"
              value={date_due_value}
              onChange={dateDue}
            />
          </Form.Field>

          <Form.Field error={invalid_date_paid_value && true}>
            <Form.Input
              label="Date Paid:"
              type="date"
              min="2008-01-01"
              max="2098-12-31"
              placeholder="Enter the date the invoice was paid"
              value={date_paid_value}
              onChange={datePaid}
            />
          </Form.Field>

          <Form.Field error={description_error && true}>
            <Form.TextArea
              label="Description:"
              placeholder="Add a description of the service the invoice is for"
              value={description_value}
              onChange={textArea}
            />
          </Form.Field>

          <Form.Field error={invalid_amount_due && true}>
            <Form.Input
              label="Amount due GBP:"
              type="text"
              maxLength="7"
              placeholder="Enter the invoice value"
              value={isNaN(amount_due_value) ? "" : amount_due_value}
              onChange={amountDue}
            />
          </Form.Field>

          <Button basic loading={loading && true} type="submit">
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
