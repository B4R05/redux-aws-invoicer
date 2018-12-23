import React from "react";
import HeaderLink from "./HeaderLink";

const Header = () => {
  return (
    <div className="ui  container segment right aligned ">
      <HeaderLink to="/invoices" location="Invoices" />
      <HeaderLink to="/invoices/new" location="New Invoice" />
      <HeaderLink to="/" location="Dashboard" />
    </div>
  );
};

export default Header;
