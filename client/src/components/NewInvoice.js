import React from "react";
import axios from "axios";

class NewInvoice extends React.Component {
  state = {
    to_value: "",
    date_due_value: "",
    date_paid_value: "",
    description_value: "",
    amount_due_value: ""
  };

  createInvoice = async () => {
    this.setState({ loading: true });

    let data = this.state;

    try {
      await axios.post("http://localhost:8080/invoice", data);
      this.setState({
        loading: false,
        server_error: false,
        to_value: "",
        date_due_value: "",
        date_paid_value: "",
        description_value: "",
        amount_due_value: ""
      });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, server_error: true });
    }
  };

  showMessage = () => {
    let { server_error, form_error } = this.state;

    if (server_error) {
      return (
        <div className="ui red message">
          A server error happened and we could not create a new invoice, please
          submit the form again.
        </div>
      );
    } else if (server_error === false) {
      return (
        <div className="ui green message">
          A new invoice was successfully created. You can now see it on your
          invoice list page.
        </div>
      );
    }

    if (form_error) {
      return (
        <div className="ui red message">Please fix the fields in red. </div>
      );
    }
  };

  handleAmountDue = e => {
    this.setState({ amount_due_value: e.target.value }, () => {
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
    this.setState({ date_paid_value: event.target.value }, () => {
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
    this.setState({ date_due_value: event.target.value }, () => {
      if (this.state.date_due_value === "") {
        this.setState({ invalid_date_due_value: true });
      } else {
        this.setState({ invalid_date_due_value: false });
      }
    });
  };

  assess = event => {
    event.preventDefault();
    this.setState({ server_error: null, form_error: null });

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

  render() {
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
    } = this.state;

    return (
      <div className="ui container segment fade very padded">
        <h2 className="ui header center aligned">New Invoice</h2>
        <form className="ui form" onSubmit={this.assess}>
          <div className={`field ${to_error && "error"}`}>
            <label>To:</label>
            <input
              type="text"
              placeholder="Enter the name of the customer"
              value={to_value}
              onChange={this.handleTextInputChange}
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
              onChange={this.handleDateDueInputChange}
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
              onChange={this.handleDatePaidInputChange}
            />
          </div>
          <div className={`field ${description_error && "error"}`}>
            <label>Description:</label>
            <textarea
              rows="2"
              placeholder="Add a description of the service the invoice is for"
              value={description_value}
              onChange={this.handleTextAreaChange}
            />
          </div>
          <div className={`field ${invalid_amount_due && "error"}`}>
            <label>Amount due GBP:</label>
            <input
              type="text"
              maxLength="7"
              placeholder="Enter the invoice value"
              value={isNaN(amount_due_value) ? "" : amount_due_value}
              onChange={this.handleAmountDue}
            />
          </div>
          <button
            className={`ui basic ${loading ? "loading" : ""} button`}
            type="submit"
          >
            Submit
          </button>
        </form>
        {this.showMessage()}
      </div>
    );
  }
}

export default NewInvoice;
