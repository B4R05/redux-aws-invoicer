import React from "react";
import { Message } from "semantic-ui-react";

const FetchError = () => {
  return (
    <Message color="red">
      A server error happened and we could not retrieve your invoices. Please
      refresh this page.
    </Message>
  );
};

export default FetchError;
