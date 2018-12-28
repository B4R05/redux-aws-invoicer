import React from "react";
import axios from "axios";
import FetchError from "./FetchError";
import FetchLoading from "./FetchLoading";
import { Container, Segment, Header } from "semantic-ui-react";

class Dashboard extends React.Component {
  state = {
    invoices: [],
    paid_invoices: "",
    pending_invoices: "",
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/invoice");

      const invoices_pending = response.data.filter(
        invoice => invoice.date_paid === ""
      ).length;

      const invoices_paid = response.data.filter(
        invoice => invoice.date_paid !== ""
      ).length;

      this.setState({
        paid_invoices: invoices_paid,
        pending_invoices: invoices_pending,
        loading: false,
        error: false
      });
    } catch (err) {
      this.setState({ loading: false, error: true });
      console.log(err);
    }
  }

  showContent = () => {
    const { loading, error } = this.state;

    if (error) {
      return <FetchError />;
    } else if (loading) {
      return (
        <Container>
          <Segment>
            <FetchLoading />
          </Segment>
        </Container>
      );
    } else {
      return (
        <Container>
          <Segment className="fade">
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
    }
  };

  render() {
    return <div>{this.showContent()}</div>;
  }
}

export default Dashboard;
