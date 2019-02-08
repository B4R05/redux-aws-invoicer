import React from "react";
import {
  reduxForm,
  Field,
  FieldArray,
  reset,
  initialize,
  destroy,
  clearFields,
  getFormValues
} from "redux-form";

import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Grid, Form, Segment, Divider, Table, Header } from "semantic-ui-react";

import { validate } from "./validate";

import FormTextField from "./FormTextField";
import FormTableItem from "./FormTableItem";

import "../../styles/InvoiceDetailForm.css";

class InvoiceDetailForm extends React.Component {
  renderTotalPrice = () => {
    if (this.props.formValues) {
      if (this.props.formValues.itemsTable.length > 0) {
        const { itemsTable } = this.props.formValues;
        const amountsArraySum = itemsTable
          .map(e => (e ? e.itemCostTotal : 0))
          .reduce((a, b) => a + b, 0);
        this.props.change("TotalCost", amountsArraySum);
        return isNaN(amountsArraySum) ? "0.00" : amountsArraySum;
      }
    }

    return "0.00";
  };

  render() {
    return (
      <Segment inverted>
        <Form inverted>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column floated="left" width={5}>
                <Field
                  name="InvoiceID"
                  component={FormTextField}
                  label="Invoice Number"
                  disabled
                  largeTextSpans
                  width={5}
                />
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Field
                  name="orderStatus"
                  component={FormTextField}
                  label="Order Status"
                  largeTextSpans
                />
                <Field
                  name="orderDate"
                  component={FormTextField}
                  label="Order Date"
                  largeTextSpans
                />
              </Grid.Column>
            </Grid.Row>
            <Divider />
            <Grid.Row>
              <Grid.Column floated="left" width={5}>
                <Field
                  name="from"
                  component={FormTextField}
                  label="Bill From"
                  largeTextSpans
                />
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Field
                  name="to"
                  component={FormTextField}
                  label="Bill To"
                  largeTextSpans
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Table inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>#</Table.HeaderCell>
                <Table.HeaderCell width={2}>Product Code</Table.HeaderCell>
                <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                <Table.HeaderCell width={1}>Category</Table.HeaderCell>
                <Table.HeaderCell width={2}>Unit Price</Table.HeaderCell>
                <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                <Table.HeaderCell width={2}>Item Total</Table.HeaderCell>
                {this.props.editMode && (
                  <Table.HeaderCell width={1}>Actions</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <FieldArray
                name="itemsTable"
                component={FormTableItem}
                rerenderOnEveryChange
              />
            </Table.Body>
          </Table>
          <Header as="h1" textAlign="right" color="grey">
            GBP Total:{" "}
            <span style={{ color: "green" }}>{this.renderTotalPrice()}</span>
          </Header>
        </Form>
      </Segment>
    );
  }
}

InvoiceDetailForm.propTypes = {
  editMode: PropTypes.bool.isRequired,
  initialise: PropTypes.func,
  reset: PropTypes.func,
  destroy: PropTypes.func,
  clearFields: PropTypes.func
};

const mapStateToProps = state => {
  return {
    editMode: state.invoices.editMode,
    selectedInvoice: state.invoices.selectedInvoice,
    formValues: getFormValues("invoiceDetailForm")(state)
  };
};

export default connect(
  mapStateToProps,
  { initialize, reset, destroy, clearFields }
)(
  reduxForm({
    form: "invoiceDetailForm",
    validate
  })(InvoiceDetailForm)
);
