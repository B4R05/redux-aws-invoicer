import React from "react";
import { Container, Table } from "semantic-ui-react";
import Invoice from "./Invoice";
import axios from "axios";
import FetchError from "../spinners/FetchError";
import FetchLoading from "../spinners/FetchLoading";
import InvoiceListIcon from "./InvoiceListIcon";
import { userPool } from "../../config";

class InvoiceList extends React.Component {
  state = {
    invoices: [],
    loading: true,
    current_sort: "paid_first"
  };

  componentDidMount() {
    userPool.getCurrentUser().getSession((err, session) => {
      if (err) {
        console.log(err);
      } else {
        axios
          .get(
            " https://nyrsgtmoql.execute-api.us-east-1.amazonaws.com/prod/invoice",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: session.getIdToken().getJwtToken()
              }
            }
          )
          .then(res => {
            this.setState({
              invoices: res.data,
              loading: false,
              error: false
            });
          })
          .catch(err => {
            this.setState({ loading: false, error: true });
            console.log(err);
          });
      }
    });
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
    let { invoices, current_sort } = this.state;

    return invoices
      .sort((a, b) => {
        if (current_sort === "paid_first") {
          return (a.date_paid === "-") - (b.date_paid === "-");
        }
        return (b.date_paid === "-") - (a.date_paid === "-");
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
              <Table.HeaderCell>To</Table.HeaderCell>
              <Table.HeaderCell>
                Status
                <InvoiceListIcon
                  toggleSort={this.toggleSort}
                  currentSort={current_sort}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>Date Due</Table.HeaderCell>
              <Table.HeaderCell>Date Paid</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount Due</Table.HeaderCell>
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

export default InvoiceList;
