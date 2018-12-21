import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui  container segment right aligned ">
      <Link to="/invoices" className="ui primary basic button  ">
        Invoices
      </Link>
      <Link to="/invoices/new" className="ui primary basic button ">
        New Invoice
      </Link>
      <Link to="/" className="ui primary basic button  ">
        Dashboard
      </Link>
    </div>
  );
};

export default Header;
