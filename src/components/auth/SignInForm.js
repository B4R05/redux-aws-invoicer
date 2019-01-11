import React from "react";
import { Link } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { userPool } from "../../config";
import {
  Button,
  Form,
  Segment,
  Container,
  Header,
  Message
} from "semantic-ui-react";
import "../../styles/SignInForm.css";

class SignInForm extends React.Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  componentDidMount() {
    if (userPool.getCurrentUser()) {
      this.props.history.push("/");
    }
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  signin = () => {
    let { username, password } = this.state;
    if (username.length && password.length) {
      this.setState({ loading: true });

      const authData = {
        Username: this.state.username,
        Password: this.state.password
      };

      const authDetails = new AuthenticationDetails(authData);
      const userData = {
        Username: this.state.username,
        Pool: userPool
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          console.log(result);

          setTimeout(() => {
            this.props.history.push("/");
          }, 200);
        },
        onFailure: err => {
          this.setState({ loading: false, error: err.message });
          console.log(err);
        }
      });
    }
  };

  showMessage = () => {
    if (this.state.error) {
      return <Message negative>{this.state.error}</Message>;
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <Container>
        <Segment inverted className="signin-form fade">
          <Header as="h2" textAlign="center">
            Sign In
          </Header>
          <Form inverted onSubmit={this.signin}>
            <Form.Field widths="equal">
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                onChange={this.handleUsername}
              />

              <Form.Input
                fluid
                label="Password"
                type="password"
                placeholder="Password"
                onChange={this.handlePassword}
              />
            </Form.Field>
            <Button loading={loading ? true : false}>Sign In</Button>
          </Form>
          <div style={{ marginTop: 20 }}>
            <small>No account? </small>
            <Link to="/signup">Sign Up</Link>
          </div>
          {this.showMessage()}
        </Segment>
      </Container>
    );
  }
}
export default SignInForm;
