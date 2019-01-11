import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Container, Message, Button } from "semantic-ui-react";
import DatePicker from "react-date-picker";
import { withRouter } from "react-router-dom";
import InvoiceCard from "./InvoiceCard";
import { userPool } from "../../config";

class InvoiceDetails extends React.Component {
  state = {
    edit_mode: false,
    date_paid_value: "-",
    loading: false
  };

  componentDidMount() {
    let { data } = this.props.location;
    if (data) {
      this.setState({
        date_paid_value: data.date_paid === "-" ? null : data.date_paid
      });
    }
  }

  updateState = res => {
    this.setState({
      date_paid_value: res,
      edit_mode: false,
      loading: false,
      server_error: false
    });
  };

  updateInvoice = () => {
    let data_to_send = {
      ...this.props.location.data,
      date_paid:
        this.state.date_paid_value === null
          ? "-"
          : this.state.date_paid_value.toISOString().split("T")[0]
    };

    userPool.getCurrentUser().getSession((err, session) => {
      if (err) {
        console.log(err);
      } else {
        axios
          .patch(
            `https://nyrsgtmoql.execute-api.us-east-1.amazonaws.com/prod/invoice/${
              data_to_send.id
            }`,
            data_to_send,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: session.getIdToken().getJwtToken()
              }
            }
          )
          .then(response => {
            console.log(response);
            this.updateState(response.data.S);
          })
          .catch(err => {
            console.log(err);
            this.setState({
              edit_mode: false,
              loading: false,
              server_error: true
            });
          });
      }
    });
  };

  handleInputChange = event => {
    console.log(event);
    this.setState({ date_paid_value: event }, () => {
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
        <DatePicker onChange={this.handleInputChange} value={date_paid_value} />
      );
    } else {
      return date_paid_value === "-" || date_paid_value === null ? (
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
        <Message negative>
          A server error happened and we could not update your invoice, please
          try again.
        </Message>
      );
    } else if (server_error === false && !invalid_date && !edit_mode) {
      return <Message positive>Invoice successfully updated.</Message>;
    }

    if (invalid_date) {
      return (
        <Message
          warning
          header="Cannot accept a future date!"
          content="Please either leave blank or select from today's date or earlier."
        />
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
        <Button inverted color="yellow" onClick={this.handleEditMode}>
          Edit Date Paid
        </Button>
      );
    } else {
      return (
        <Button
          inverted
          color="green"
          loading={loading ? true : false}
          disabled={invalid_date ? true : false}
          onClick={this.handleSave}
        >
          Save
        </Button>
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
    return <Container>{this.renderCard()}</Container>;
  }
}

InvoiceDetails.propTypes = {
  location: PropTypes.shape({
    data: PropTypes.shape({
      to: PropTypes.string.isRequired,
      date_due: PropTypes.string.isRequired,
      date_paid: PropTypes.string,
      description: PropTypes.string.isRequired,
      amount_due: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired
    })
  })
};

export default withRouter(InvoiceDetails);
