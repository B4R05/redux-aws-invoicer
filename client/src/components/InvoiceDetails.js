import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class InvoiceDetails extends React.Component {
  state = {
    edit_mode: false,
    date_paid_value: "",
    loading: false
  };

  componentDidMount() {
    let { props } = this.props.location;
    if (props) {
      this.setState({
        date_paid_value: props.data.date_paid
      });
    }
  }

  updateInvoice = async () => {
    let data = {
      date_paid_value: this.state.date_paid_value,
      id: this.props.location.props.data._id
    };

    try {
      const response = await axios.patch("http://localhost:8080/invoice", data);

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

  renderButtons = () => {
    let { edit_mode, loading, invalid_date } = this.state;

    if (edit_mode === false) {
      return (
        <button
          className="ui button primary"
          onClick={() => {
            this.setState({ edit_mode: true });
          }}
        >
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
            onClick={() => {
              this.setState({ loading: true }, () => {
                this.updateInvoice();
              });
            }}
          >
            Save
          </button>
        </span>
      );
    }
  };

  renderCard = () => {
    if (!this.props.location.props) {
      this.props.history.push("/invoices");
    } else {
      let {
        amount_due,
        date_due,
        description,
        to
      } = this.props.location.props.data;

      return (
        <div className="ui card fade">
          <div className="content">
            <div className="header">Invoice Details</div>
          </div>
          <div className="content">
            <h4 className="ui sub header">To</h4>
            <div className="ui small feed">{to}</div>
            <h4 className="ui sub header">Date Due</h4>
            <div className="ui small feed">{date_due}</div>
            <h4 className="ui sub header">Date Paid</h4>
            <div className="ui small feed">{this.editDatePaid()}</div>
            <h4 className="ui sub header">Description</h4>
            <div className="ui small feed">{description}</div>
            <h4 className="ui sub header">Amount Due</h4>
            <div className="ui small feed">£{amount_due}</div>
          </div>
          <div className="extra content">{this.renderButtons()}</div>
          {this.showMessage()}
        </div>
      );
    }
  };

  render() {
    return <div className="ui container">{this.renderCard()}</div>;
  }
}

InvoiceDetails.propTypes = {
  location: PropTypes.shape({
    props: PropTypes.shape({
      data: PropTypes.shape({
        to: PropTypes.string.isRequired,
        date_due: PropTypes.string.isRequired,
        date_paid: PropTypes.string,
        description: PropTypes.string.isRequired,
        amount_due: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
      })
    })
  })
};

InvoiceDetails.defaultProps = {
  location: {
    props: {
      data: {
        to: "Unknown company",
        date_due: "Due Date unknown",
        date_paid: "Date Paid unknown",
        description: "No description entered",
        amount_due: "No amount due entered",
        _id: "No id entered"
      }
    }
  }
};

export default InvoiceDetails;
