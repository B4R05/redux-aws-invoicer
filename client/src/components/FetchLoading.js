import React from "react";
import { Message, Icon } from "semantic-ui-react";

const FetchLoading = () => {
  return (
    <Message icon>
      <Icon name="circle notched" loading />
      <Message.Content>
        <Message.Header> Fetching your invoices...</Message.Header>
      </Message.Content>
    </Message>
  );
};

export default FetchLoading;
