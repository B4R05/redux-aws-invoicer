import React from "react";
import { userPool } from "../../config";

const requireAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = { isAuth: null };

    componentDidMount() {
      if (!userPool.getCurrentUser()) {
        this.setState({ isAuth: false });
        this.props.history.push("/signin");
      } else {
        this.setState({ isAuth: true });
      }
    }

    renderComponent() {
      if (this.state.isAuth) {
        return <WrappedComponent isAuth={this.state.isAuth} />;
      }
    }

    render() {
      return <React.Fragment>{this.renderComponent()}</React.Fragment>;
    }
  }

  return HOC;
};
export default requireAuth;
