import React from "react";
import { connect } from "react-redux";
import { Container, Segment, Header } from "semantic-ui-react";
import { fetchInvoices, initialise } from "../../actions/index";
import FetchError from "../spinners/FetchError";
import FetchLoading from "../spinners/FetchLoading";

class Dashboard extends React.Component {
  state = {
    paid_invoices: "",
    pending_invoices: "",
    loading: true,
    error: false
  };

  //fetches invoices
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

  componentWillUnmount() {
    this.props.initialise([]);
  }

  //find paid and unpaid invoices
  handleResponse = () => {
    console.log(this.props.fetchedInvoices);
    const invoices_pending = this.props.response.filter(
      invoice => invoice.orderStatus === "Pending"
    ).length;

    const invoices_paid = this.props.response.filter(
      invoice => invoice.orderStatus === "Paid"
    ).length;

    this.setState({
      paid_invoices: invoices_paid,
      pending_invoices: invoices_pending,
      loading: false,
      error: false
    });
  };

  handleError = () => {
    this.setState({ loading: false, error: true });
  };

  showContent = () => {
    const { loading, error } = this.state;

    if (error) {
      return <FetchError />;
    } else if (loading) {
      return this.showLoading();
    } else {
      return this.showStatusOfInvoices();
    }
  };

  showLoading = () => {
    return (
      <Container>
        <Segment inverted>
          <FetchLoading />
        </Segment>
      </Container>
    );
  };

  showStatusOfInvoices = () => {
    return (
      <Container>
        <Segment inverted className="fade">
          <Header as="h2">Paid Invoices</Header>
          <Header as="h1" color="green">
            {this.state.paid_invoices}
          </Header>
          <Header as="h2">Pending Invoices</Header>
          <Header as="h1" color="red">
            {this.state.pending_invoices}
          </Header>
        </Segment>
      </Container>
    );
  };

  render() {
    return <div>{this.showContent()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    token: state.authToken,
    response: state.invoices.invoices
  };
};

export default connect(
  mapStateToProps,
  { fetchInvoices, initialise }
)(Dashboard);
