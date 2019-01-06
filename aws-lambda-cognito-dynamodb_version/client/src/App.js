import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import NewInvoice from "./components/NewInvoice";
import InvoiceList from "./components/InvoiceList";
import InvoiceDetails from "./components/InvoiceDetails";

const App = () => {
  return (
    <div>
      <Router history={createHistory()}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/invoices" exact component={InvoiceList} />
            <Route path="/invoices/new" exact component={NewInvoice} />
            <Route path="/invoices/:id" exact component={InvoiceDetails} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
