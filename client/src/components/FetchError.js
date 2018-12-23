import React from "react";

const FetchError = () => {
  return (
    <div className="ui red message">
      A server error happened and we could not retrieve your invoices. Please
      refresh this page.
    </div>
  );
};

export default FetchError;
