import React from "react";
import { Button, Form, Segment, Header, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

import { userPool } from "../../config";

class SignUpFormStep2 extends React.Component {
  state = {
    username: "",
    code: ""
  };

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleValidationCode = event => {
    this.setState({ code: event.target.value });
  };

  confirmAccount = () => {
    let { username, code } = this.state;

    if (username.length && code.length) {
      this.setState({ loading: true });
      const userData = {
        Username: this.state.username,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(this.state.code, true, (err, result) => {
        if (err) {
          console.log(err);
          this.setState({ error: err.message, loading: false });
          return;
        } else {
          this.getSession();
        }
      });
    }
  };

  getSession = () => {
    const authData = {
      Username: this.state.username,
      Password: this.props.password
    };

    const authDetails = new AuthenticationDetails(authData);

    const userData = {
      Username: this.state.username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: result => {
        return this.handleAuthenticationSuccess(result);
      },
      onFailure: err => {
        return this.handleAuthenticationFailure(err);
      }
    });
  };

  handleAuthenticationSuccess = result => {
    console.log(result);
    setTimeout(() => {
      this.props.history.push("/");
    }, 200);
  };
  handleAuthenticationFailure = err => {
    this.setState({ loading: false, error: err.message });
    console.log(err);
  };

  showErrorMessage = () => {
    if (this.state.error) {
      return <Message negative>{this.state.error}</Message>;
    }
  };

  render() {
    let { loading } = this.state;

    return (
      <Segment inverted className="sign-form fade">
        <Header as="h5" textAlign="center" color="grey">
          Step 2: Enter the code received by email
        </Header>
        <Form inverted onSubmit={this.confirmAccount}>
          <Form.Field widths="equal">
            <Form.Input
              fluid
              label="Username"
              placeholder="Username"
              onChange={this.handleUsername}
            />

            <Form.Input
              fluid
              label="Validation Code"
              placeholder="Validation Code"
              onChange={this.handleValidationCode}
            />
          </Form.Field>
          <Button loading={loading ? true : false}>Confirm account</Button>
        </Form>
        {this.showErrorMessage()}
      </Segment>
    );
  }
}
export default withRouter(SignUpFormStep2);
