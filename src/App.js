import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import "./styles/App.css";
import Header from "./components/navbar/Header";
import Dashboard from "./components/auth/Dashboard";
import NewInvoice from "./components/invoice/NewInvoice";
import InvoiceList from "./components/invoice/InvoiceList";
import InvoiceDetails from "./components/invoice/InvoiceDetails";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import requireAuth from "./components/auth/requireAuth";

const App = () => {
  return (
    <div>
      <Router history={createHistory()}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={requireAuth(Dashboard)} />
            <Route
              path="/invoices"
              exact
              component={requireAuth(InvoiceList)}
            />
            <Route
              path="/invoices/new"
              exact
              component={requireAuth(NewInvoice)}
            />
            <Route
              path="/invoices/:id"
              exact
              component={requireAuth(InvoiceDetails)}
            />
            <Route path="/signin" exact component={SignInForm} />
            <Route path="/signup" exact component={SignUpForm} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
