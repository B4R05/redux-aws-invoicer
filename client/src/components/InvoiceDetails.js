import React from "react";
import axios from "axios";
import InvoiceCard from "./InvoiceCard";
import PropTypes from "prop-types";

class InvoiceDetails extends React.Component {
  state = {
    edit_mode: false,
    date_paid_value: "",
    loading: false
  };

  componentDidMount() {
    let { data } = this.props.location;
    if (data) {
      this.setState({
        date_paid_value: data.date_paid
      });
    }
  }

  updateInvoice = async () => {
    let data_to_send = {
      date_paid_value: this.state.date_paid_value,
      id: this.props.location.data._id
    };

    try {
      const response = await axios.patch(
        "http://localhost:8080/invoice",
        data_to_send
      );

      this.setState({
        date_paid_value: response.data.date_paid,
        edit_mode: false,
        loading: false,
        server_error: false
      });
    } catch (err) {
      console.log(err);
      this.setState({
        edit_mode: false,
        loading: false,
        server_error: true
      });
    }
  };

  handleInputChange = event => {
    this.setState({ date_paid_value: event.target.value }, () => {
      let date_entered = new Date(this.state.date_paid_value);
      let date_today = new Date();

      if (date_entered > date_today) {
        this.setState({ invalid_date: true });
      } else {
        this.setState({ invalid_date: false });
      }
    });
  };

  editDatePaid = () => {
    let { date_paid_value, edit_mode } = this.state;

    if (edit_mode) {
      return (
        <input
          type="date"
          min="2008-01-01"
          max="2098-12-31"
          placeholder="Enter the date the invoice was paid"
          value={date_paid_value}
          onChange={this.handleInputChange}
        />
      );
    } else {
      return date_paid_value === "" ? (
        <strong style={{ color: "red" }}>Unpaid</strong>
      ) : (
        date_paid_value
      );
    }
  };

  showMessage = () => {
    let { server_error, invalid_date, edit_mode } = this.state;

    if (server_error) {
      return (
        <div className="ui red message">
          A server error happened and we could not update your invoice, please
          try again.
        </div>
      );
    } else if (server_error === false && !invalid_date && !edit_mode) {
      return (
        <div className="ui green message">Invoice successfully updated.</div>
      );
    }

    if (invalid_date) {
      return (
        <div className="ui warning message">
          Please either leave blank or select from today's date or earlier.
        </div>
      );
    }
  };

  handleSave = () => {
    this.setState({ loading: true }, () => {
      this.updateInvoice();
    });
  };

  handleEditMode = () => {
    this.setState({ edit_mode: true });
  };

  renderButtons = () => {
    let { edit_mode, loading, invalid_date } = this.state;

    if (edit_mode === false) {
      return (
        <button className="ui button primary" onClick={this.handleEditMode}>
          Edit Date Paid
        </button>
      );
    } else {
      return (
        <span>
          <button
            className={`ui ${
              loading ? "loading gray" : invalid_date ? "disabled" : "green"
            } button`}
            onClick={this.handleSave}
          >
            Save
          </button>
        </span>
      );
    }
  };

  renderCard = () => {
    if (!this.props.location.data) {
      this.props.history.push("/invoices");
    } else {
      return (
        <InvoiceCard
          data={this.props.location.data}
          editDatePaid={this.editDatePaid}
          renderButtons={this.renderButtons}
          showMessage={this.showMessage}
        />
      );
    }
  };

  render() {
    return <div className="ui container">{this.renderCard()}</div>;
  }
}

InvoiceDetails.propTypes = {
  location: PropTypes.shape({
    data: PropTypes.shape({
      to: PropTypes.string.isRequired,
      date_due: PropTypes.string.isRequired,
      date_paid: PropTypes.string,
      description: PropTypes.string.isRequired,
      amount_due: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  })
};

export default InvoiceDetails;
