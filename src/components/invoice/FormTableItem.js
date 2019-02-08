import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button, Icon } from "semantic-ui-react";
import { Field, getFormValues, change, arrayPush } from "redux-form";
import FormTextField from "./FormTextField";

class FormTableItem extends React.Component {
  renderInvoiceItemTotal = index => {
    const { invoiceItems } = this.props.formValues;
    if (invoiceItems[index]) {
      return invoiceItems[index].itemUnitPrice * invoiceItems[index].itemAmount;
    }

    return 0;
  };

  renderInvoiceItems = () => {
    return this.props.fields.map((invoiceItem, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>{`${index + 1}`}</Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemCode`}
              component={FormTextField}
              width=""
            />
          </Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemDescription`}
              component={FormTextField}
              width=""
            />
          </Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemCategory`}
              component={FormTextField}
              width=""
            />
          </Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemUnitPrice`}
              component={FormTextField}
              width=""
              parse={value => (isNaN(value) ? 1 : parseFloat(value))}
              format={value => (isNaN(value) ? 1 : parseFloat(value))}
              onChange={(e, newValue) => {
                this.props.changeFieldInReduxForm(
                  "invoiceDetailForm",
                  `${invoiceItem}.itemCostTotal`,
                  newValue * this.props.formValues.itemsTable[index].itemAmount
                );
              }}
            />
          </Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemAmount`}
              component={FormTextField}
              width=""
              parse={value => (isNaN(value) ? 1 : parseFloat(value))}
              format={value => (isNaN(value) ? 1 : parseFloat(value))}
              onChange={(e, newValue) => {
                this.props.changeFieldInReduxForm(
                  "invoiceDetailForm",
                  `${invoiceItem}.itemCostTotal`,
                  this.props.formValues.itemsTable[index].itemUnitPrice *
                    newValue
                );
              }}
            />
          </Table.Cell>
          <Table.Cell>
            <Field
              name={`${invoiceItem}.itemCostTotal`}
              component={FormTextField}
              width=""
              disabled
            />
          </Table.Cell>

          {this.props.editMode && (
            <Table.Cell>
              <Button icon onClick={() => this.props.fields.remove(index)}>
                <Icon name="trash alternate outline" />
              </Button>
            </Table.Cell>
          )}
        </Table.Row>
      );
    });
  };

  render() {
    return (
      <Fragment>
        {this.renderInvoiceItems()}
        <Table.Row>
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />

          {this.props.editMode && (
            <Table.Cell>
              <Button
                icon
                onClick={() => {
                  this.props.arrayPush("invoiceDetailForm", "itemsTable", {
                    itemUnitPrice: 0,
                    itemAmount: 0,
                    itemDescription: "",
                    itemCategory: "",
                    itemCostTotal: 0,
                    itemCode: ""
                  });
                }}
              >
                <Icon name="add" />
              </Button>
            </Table.Cell>
          )}
        </Table.Row>
      </Fragment>
    );
  }
}

FormTableItem.propTypes = {
  editMode: PropTypes.bool.isRequired,
  change: PropTypes.func,
  arrayPush: PropTypes.func
};

const mapStateToProps = state => {
  return {
    editMode: state.invoices.editMode,
    formValues: getFormValues("invoiceDetailForm")(state)
  };
};

export default connect(
  mapStateToProps,
  { changeFieldInReduxForm: change, arrayPush }
)(FormTableItem);
