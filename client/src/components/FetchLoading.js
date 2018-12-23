import React from "react";

const FetchLoading = () => {
  return (
    <div className="ui icon message">
      <i className="notched circle loading icon" />
      <div className="content">
        <div className="header">Fetching your invoices..</div>
      </div>
    </div>
  );
};

export default FetchLoading;
