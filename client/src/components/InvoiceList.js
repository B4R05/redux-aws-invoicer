import React from "react";
import Invoice from "./Invoice";
import axios from "axios";

class InvoiceList extends React.Component {
  state = {
    invoices: [],
    loading: true,
    current_sort: "paid_first"
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/invoice");
      this.setState({ invoices: response.data, loading: false, error: false });
    } catch (err) {
      this.setState({ loading: false, error: true });
      console.log(err);
    }
  }

  showMessage = () => {
    let { error, loading } = this.state;

    if (error) {
      return (
        <div className="ui red message">
          A server error happened and we could not retrieve your invoices.
          Please refresh this page.
        </div>
      );
    }

    if (loading) {
      return (
        <div className="ui icon message">
          <i className="notched circle loading icon" />
          <div className="content">
            <div className="header">Fetching your invoices..</div>
          </div>
        </div>
      );
    }
  };

  renderInvoices = () => {
    let { invoices, current_sort } = this.state;

    return invoices
      .sort((a, b) => {
        if (current_sort === "paid_first") {
          return (a.date_paid === "") - (b.date_paid === "");
        }
        return (b.date_paid === "") - (a.date_paid === "");
      })
      .map((invoice, key, array) => {
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
      <div className="ui container fade ">
        <table className="ui fixed celled table fade">
          <thead>
            <tr>
              <th>To</th>
              <th>Date Due</th>
              <th>Date Paid</th>
              <th>Description</th>
              <th>Amount Due</th>
              <th>
                Status
                <i
                  onClick={this.toggleSort}
                  className={`angle ${
                    current_sort === "paid_first" ? "down" : "up"
                  } icon`}
                  style={{ cursor: "pointer", marginLeft: "2%" }}
                />
              </th>
              <th>Edit Invoice</th>
            </tr>
          </thead>
          <tbody>{this.renderInvoices()}</tbody>
        </table>
        {this.showMessage()}
      </div>
    );
  }
}

export default InvoiceList;
