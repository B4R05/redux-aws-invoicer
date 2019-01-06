import React from "react";

const InvoiceListIcon = ({ toggleSort, currentSort }) => {
  return (
    <i
      onClick={toggleSort}
      className={`angle ${currentSort === "paid_first" ? "down" : "up"} icon`}
      style={{ cursor: "pointer", marginLeft: "2%" }}
    />
  );
};

export default InvoiceListIcon;
