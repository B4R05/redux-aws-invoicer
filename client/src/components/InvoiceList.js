import React from "react";
import Invoice from "./Invoice";
import axios from "axios";
import FetchError from "./FetchError";
import FetchLoading from "./FetchLoading";
import InvoiceListIcon from "./InvoiceListIcon";

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
                <InvoiceListIcon
                  toggleSort={this.toggleSort}
                  currentSort={current_sort}
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
