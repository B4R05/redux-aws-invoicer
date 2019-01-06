import React from "react";
import axios from "axios";
import FetchError from "./FetchError";
import FetchLoading from "./FetchLoading";

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
        <div className="ui container segment">
          <FetchLoading />
        </div>
      );
    } else {
      return (
        <div className="ui container segment">
          <div className="fade">
            <h2>Paid Invoices</h2>
            <h1 style={{ color: "lightgreen" }}>{this.state.paid_invoices}</h1>
            <h2>Pending Invoices</h2>
            <h1 style={{ color: "tomato" }}>{this.state.pending_invoices}</h1>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.showContent()}</div>;
  }
}

export default Dashboard;
