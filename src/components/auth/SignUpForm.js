import React from "react";
import { userPool } from "../../config";
import SignUpFormStep1 from "./SignUpFormStep1";
import SignUpFormStep2 from "./SignUpFormStep2";

import "../../styles/SignUpForm.css";
import { Container } from "semantic-ui-react";

class SignUpForm extends React.Component {
  state = {
    stepOneSuccess: null,
    password: ""
  };

  componentDidMount() {
    if (userPool.getCurrentUser()) {
      this.props.history.push("/");
    }
  }

  handleSuccess = arg => {
    this.setState({ stepOneSuccess: arg });
  };

  handlePassword = arg => {
    this.setState({ password: arg });
  };

  renderForms = () => {
    if (this.state.stepOneSuccess) {
      return <SignUpFormStep2 password={this.state.password} />;
    }

    return (
      <SignUpFormStep1
        success={this.handleSuccess}
        password={this.handlePassword}
      />
    );
  };

  render() {
    return <Container>{this.renderForms()}</Container>;
  }
}
export default SignUpForm;
