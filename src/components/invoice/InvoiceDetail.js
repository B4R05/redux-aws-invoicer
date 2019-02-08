import React, { Fragment } from "react";
import { connect } from "react-redux";
import "../../styles/InvoiceDetailForm.css";
import PropTypes from "prop-types";

import { Container, Button, Message } from "semantic-ui-react";
import {
  initialize,
  reset,
  getFormSyncErrors,
  getFormValues
} from "redux-form";

import InvoiceDetailForm from "./InvoiceDetailForm";
import { toggleEditMode, saveInvoice, onCancel } from "../../actions/index";

class InvoiceDetail extends React.Component {
  state = { loading: false };

  componentDidMount() {
    if (Object.keys(this.props.selectedInvoice) < 1) {
      this.props.history.push("/invoices");
    } else {
      this.props.initialize("invoiceDetailForm", this.props.selectedInvoice);
      if (this.props.location.pathname === "/invoices/new") {
        this.handleEditMode();
      }
    }
  }

  componentWillUnmount() {
    this.setState({ loading: false, error: null });
    this.props.toggleEditMode(false);
  }

  handleSave = () => {
    if (Object.keys(this.props.formErrors).length < 1) {
      this.setState({ loading: true }, () => {
        this.props.saveInvoice(this.props.formValues, this.props.token);
      });

      setTimeout(() => {
        if (this.props.httpResponse.status === 200) {
          this.props.initialize("invoiceDetailForm", this.props.formValues);
          this.setState({ loading: false, error: false });
          this.props.toggleEditMode(false);
        } else {
          this.setState({ loading: false, error: true });
          this.props.toggleEditMode(true);
        }
      }, 1000);
    }
  };

  handleCancel = () => {
    this.setState({ loading: false, error: null });
    this.props.resetReduxFormToLastInitializedState("invoiceDetailForm");
    this.props.toggleEditMode(false);
    if (this.props.location.pathname === "/invoices/new") {
      this.props.history.push("/invoices");
    }
  };

  handleEditMode = () => {
    this.setState({ error: null });
    this.props.toggleEditMode(true);
  };

  toggleButtons = () => {
    const { loading } = this.state;
    return this.props.editMode ? (
      <Fragment>
        <Button
          color="green"
          loading={loading}
          onClick={this.handleSave}
          content="Save"
        />
        <Button color="grey" onClick={this.handleCancel} content="Cancel" />
      </Fragment>
    ) : (
      <Button primary content="Edit Invoice" onClick={this.handleEditMode} />
    );
  };

  showMessage = () => {
    if (this.state.error) {
      return (
        <Message negative>
          <Message.Header>An error occurred.</Message.Header>
          <p>Please try again in a few minutes</p>
        </Message>
      );
    }
    if (this.state.error === false) {
      return (
        <Message positive>
          <Message.Header>Success!</Message.Header>
          <p>Your can see changes in the 'invoices' page</p>
        </Message>
      );
    }
  };

  render() {
    return (
      <Container>
        <div className="bill-header">{this.toggleButtons()}</div>
        {this.showMessage()}
        <InvoiceDetailForm />
        <Button>Send Invoice</Button>
      </Container>
    );
  }
}

InvoiceDetail.propTypes = {
  editMode: PropTypes.bool.isRequired,
  httpResponse: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  saveInvoice: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  initialise: PropTypes.func,
  reset: PropTypes.func
};
const mapStateToProps = state => {
  return {
    token: state.authToken,
    editMode: state.invoices.editMode,
    selectedInvoice: state.invoices.selectedInvoice,
    httpResponse: state.invoices.httpResponse,
    formValues: getFormValues("invoiceDetailForm")(state),
    formErrors: getFormSyncErrors("invoiceDetailForm")(state)
  };
};

export default connect(
  mapStateToProps,
  {
    saveInvoice,
    onCancel,
    toggleEditMode,
    initialize,
    resetReduxFormToLastInitializedState: reset
  }
)(InvoiceDetail);
