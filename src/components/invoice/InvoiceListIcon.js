import React from "react";
import { Icon } from "semantic-ui-react";

const InvoiceListIcon = ({ toggleSort, currentSort }) => {
  return (
    <Icon
      onClick={toggleSort}
      name={`angle ${currentSort === "paid_first" ? "down" : "up"}`}
      style={{ cursor: "pointer", marginLeft: "2%" }}
    />
  );
};

export default InvoiceListIcon;
