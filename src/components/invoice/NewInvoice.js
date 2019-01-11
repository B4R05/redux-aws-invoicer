import React from "react";
import axios from "axios";
import { Message } from "semantic-ui-react";
import NewInvoiceForm from "./NewInvoiceForm";
import { userPool } from "../../config";

class NewInvoice extends React.Component {
  state = {
    to_value: "",
    date_due_value: "",
    date_paid_value: "",
    description_value: "",
    amount_due_value: ""
  };

  clearState = () => {
    this.setState({
      loading: false,
      server_error: false,
      to_value: "",
      date_due_value: "",
      date_paid_value: "",
      description_value: "",
      amount_due_value: ""
    });
  };

  createInvoice = () => {
    this.setState({ loading: true });

    let data = {
      to: this.state.to_value,
      description: this.state.description_value,
      date_due: this.state.date_due_value.toISOString().split("T")[0],
      date_paid: this.state.date_paid_value.toISOString().split("T")[0] || "-",
      amount_due: this.state.amount_due_value
    };

    userPool.getCurrentUser().getSession((err, session) => {
      if (err) {
        console.log(err);
      } else {
        axios
          .post(
            "https://nyrsgtmoql.execute-api.us-east-1.amazonaws.com/prod/invoice",
            data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: session.getIdToken().getJwtToken()
              }
            }
          )
          .then(response => {
            console.log(response);
            this.clearState();
          })
          .catch(err => {
            console.log(err);
            this.setState({ loading: false, server_error: true });
          });
      }
    });
  };

  showMessage = () => {
    let { server_error, form_error } = this.state;

    if (server_error) {
      return (
        <Message negative>
          A server error happened and we could not create a new invoice, please
          submit the form again.
        </Message>
      );
    } else if (server_error === false) {
      return (
        <Message positive>
          Invoice successfully created. You can now see it on your invoice list
          page.
        </Message>
      );
    }

    if (form_error) {
      return <Message negative>Please fix the fields in red.</Message>;
    }
  };

  handleAmountDue = event => {
    this.setState({ amount_due_value: event.target.value }, () => {
      if (this.state.amount_due_value === "") {
        this.setState({ invalid_amount_due: true });
      } else {
        this.setState({ invalid_amount_due: false });
      }
    });
  };

  handleTextInputChange = event => {
    this.setState({ to_value: event.target.value }, () => {
      if (this.state.to_value === "") {
        this.setState({ to_error: true });
      } else {
        this.setState({ to_error: false });
      }
    });
  };

  handleTextAreaChange = event => {
    this.setState({ description_value: event.target.value }, () => {
      if (this.state.description_value === "") {
        this.setState({ description_error: true });
      } else {
        this.setState({ description_error: false });
      }
    });
  };

  handleDatePaidInputChange = event => {
    this.setState({ date_paid_value: event }, () => {
      let date_entered = new Date(this.state.date_paid_value);
      let date_today = new Date();

      if (date_entered > date_today) {
        this.setState({ invalid_date_paid_value: true });
      } else {
        this.setState({ invalid_date_paid_value: false });
      }
    });
  };

  handleDateDueInputChange = event => {
    this.setState({ date_due_value: event }, () => {
      if (this.state.date_due_value === "") {
        this.setState({ invalid_date_due_value: true });
      } else {
        this.setState({ invalid_date_due_value: false });
      }
    });
  };

  validate = () => {
    let {
      invalid_date_paid_value,
      date_due_value,
      to_value,
      description_value,
      amount_due_value
    } = this.state;

    if (
      to_value === "" &&
      description_value === "" &&
      date_due_value === "" &&
      amount_due_value === ""
    ) {
      this.setState({
        to_error: true,
        description_error: true,
        invalid_date_due_value: true,
        invalid_amount_due: true,
        form_error: true
      });
    } else if (description_value === "") {
      this.setState({ description_error: true, form_error: true });
    } else if (to_value === "") {
      this.setState({ to_error: true, form_error: true });
    } else if (date_due_value === "") {
      this.setState({ invalid_date_due_value: true, form_error: true });
    } else if (invalid_date_paid_value) {
      this.setState({ invalid_date_paid_value: true, form_error: true });
    } else if (amount_due_value === "") {
      this.setState({ invalid_amount_due: true, form_error: true });
    } else {
      this.setState({ form_error: false }, () => {
        this.createInvoice();
      });
    }
  };

  assess = event => {
    event.preventDefault();
    this.setState({ server_error: null, form_error: null });

    this.validate();
  };

  render() {
    return (
      <NewInvoiceForm
        parentState={this.state}
        assess={this.assess}
        textInput={this.handleTextInputChange}
        dateDue={this.handleDateDueInputChange}
        datePaid={this.handleDatePaidInputChange}
        textArea={this.handleTextAreaChange}
        amountDue={this.handleAmountDue}
        showMessage={this.showMessage}
      />
    );
  }
}

export default NewInvoice;
