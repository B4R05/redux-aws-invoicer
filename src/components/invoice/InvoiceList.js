import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Table, Icon } from "semantic-ui-react";
import { initialise, fetchInvoices } from "../../actions/index";
import Invoice from "./Invoice";
import FetchError from "../spinners/FetchError";
import FetchLoading from "../spinners/FetchLoading";

class InvoiceList extends React.Component {
  state = {
    loading: true,
    current_sort: "paid_first"
  };

  async componentDidMount() {
    const token = await this.props.token;

    if (token.length) {
      return this.props.fetchInvoices(this.props.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      if (!this.props.response) {
        return this.handleError();
      }
      return this.handleResponse();
    }
  }

  handleResponse = () => {
    this.setState({
      loading: false,
      error: false
    });
  };

  handleError = () => {
    this.setState({ loading: false, error: true });
  };

  componentWillUnmount() {
    this.props.initialise([]);
  }

  showMessage = () => {
    let { error, loading } = this.state;

    if (error) {
      return <FetchError />;
    }

    if (loading) {
      return <FetchLoading />;
    }
  };

  renderInvoices = () => {
    let { current_sort } = this.state;

    return this.props.response
      .sort((a, b) => {
        if (current_sort === "paid_first") {
          return (b.orderStatus === "Pending") - (a.orderStatus === "Pending");
        } else {
          return (b.orderStatus === "Paid") - (a.orderStatus === "Paid");
        }
      })
      .map((invoice, key) => {
        return <Invoice key={key} data={invoice} />;
      });
  };

  toggleSort = () => {
    let { current_sort } = this.state;
    if (current_sort === "paid_first") {
      this.setState({ current_sort: "pending_first" });
    } else {
      this.setState({ current_sort: "paid_first" });
    }
  };

  render() {
    let { current_sort } = this.state;

    return (
      <Container>
        <Table celled inverted className="fade">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>
                Status
                <Icon
                  onClick={this.toggleSort}
                  name={`angle ${
                    current_sort === "paid_first" ? "down" : "up"
                  }`}
                  style={{ cursor: "pointer", marginLeft: "2%" }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Bill From</Table.HeaderCell>
              <Table.HeaderCell>Bill To</Table.HeaderCell>
              <Table.HeaderCell>Total Cost</Table.HeaderCell>
              <Table.HeaderCell>Edit Invoice</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderInvoices()}</Table.Body>
        </Table>

        {this.showMessage()}
      </Container>
    );
  }
}

InvoiceList.propTypes = {
  token: PropTypes.string.isRequired,
  response: PropTypes.array.isRequired,
  initialise: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    response: state.invoices.invoices,
    token: state.authToken
  };
};

export default connect(
  mapStateToProps,
  { initialise, fetchInvoices }
)(InvoiceList);
