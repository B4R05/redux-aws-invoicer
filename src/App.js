import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/navbar/Header";
import Dashboard from "./components/auth/Dashboard";
import InvoiceList from "./components/invoice/InvoiceList";
import InvoiceDetail from "./components/invoice/InvoiceDetail";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import requireAuth from "./components/auth/requireAuth";

import "./styles/App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={requireAuth(Dashboard)} />
          <Route path="/invoices" exact component={requireAuth(InvoiceList)} />
          <Route
            path="/invoices/new"
            exact
            component={requireAuth(InvoiceDetail)}
          />
          <Route
            path="/invoices/edit/:id"
            exact
            component={requireAuth(InvoiceDetail)}
          />
          <Route path="/signin" exact component={SignInForm} />
          <Route path="/signup" exact component={SignUpForm} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
