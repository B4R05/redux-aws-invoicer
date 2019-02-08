import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Segment, Header, Message } from "semantic-ui-react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

import { userPool } from "../../config";

class SignUpFormStep1 extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    loading: false
  };

  handleEmail = event => {
    let { email } = this.state;

    this.setState({ email: event.target.value }, () => {
      if (email.length > 3 && email.includes("@")) {
        this.setState({ emailError: false });
      } else {
        this.setState({ emailError: true });
      }
    });
  };

  handleUsername = event => {
    this.setState({ username: event.target.value }, () => {
      if (this.state.username.length > 3) {
        this.setState({ usernameError: false });
      } else {
        this.setState({ usernameError: true });
      }
    });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value }, () => {
      this.props.password(this.state.password);
      if (this.state.password.length > 5) {
        this.setState({ passwordError: false });
      } else {
        this.setState({ passwordError: true });
      }
    });
  };

  showEmailError = () => {
    if (this.state.emailError) {
      return (
        <Message negative>
          Enter a valid email. A code will be sent to it for next steps.
        </Message>
      );
    }
  };
  showUsernameError = () => {
    if (this.state.usernameError) {
      return <Message negative>Enter atleast 4 characters</Message>;
    }
  };
  showPasswordError = () => {
    if (this.state.passwordError) {
      return (
        <Message negative>
          Enter atleast 7 lowercase characters including a number
        </Message>
      );
    }
  };
  showMessage = () => {
    if (this.state.error) {
      return <Message negative>{this.state.error}</Message>;
    }
  };

  submit = () => {
    let { emailError, passwordError, usernameError } = this.state;
    if (
      emailError === false &&
      passwordError === false &&
      usernameError === false
    ) {
      this.setState({ loading: true });

      let { username, email, password } = this.state;

      const attrList = [];
      const emailAttribute = {
        Name: "email",
        Value: email
      };
      attrList.push(new CognitoUserAttribute(emailAttribute));
      userPool.signUp(username, password, attrList, null, (err, result) => {
        if (err) {
          return this.handleSignUpError(err);
        } else {
          return this.handleSignUpSuccess();
        }
      });
    }
  };

  handleSignUpError = err => {
    console.log(err);
    this.props.success(false);
    this.setState({ loading: false, error: err.message });
  };

  handleSignUpSuccess = () => {
    this.setState({ loading: false });
    this.props.success(true);
  };

  render() {
    const { loading } = this.state;

    return (
      <Segment inverted className="sign-form fade">
        <Header as="h2" textAlign="center">
          Sign Up
        </Header>
        <Header as="h5" textAlign="center" color="grey">
          Step 1: Enter your details
        </Header>
        <Form inverted onSubmit={this.submit}>
          <Form.Field widths="equal">
            <Form.Input
              fluid
              label="Username"
              placeholder="Username"
              onChange={this.handleUsername}
            />
            {this.showUsernameError()}
            <Form.Input
              fluid
              label="email"
              placeholder="Email"
              onChange={this.handleEmail}
            />
            {this.showEmailError()}
            <Form.Input
              fluid
              label="Password"
              type="password"
              placeholder="Password"
              onChange={this.handlePassword}
            />
            {this.showPasswordError()}
          </Form.Field>
          <Button loading={loading ? true : false}>Sign Up</Button>
          {this.showMessage()}
        </Form>
        <div style={{ marginTop: 20 }}>
          <small>Have an account? </small>
          <Link to="/signin">Sign In</Link>
        </div>
      </Segment>
    );
  }
}
export default SignUpFormStep1;
