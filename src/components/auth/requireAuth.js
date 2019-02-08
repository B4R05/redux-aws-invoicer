import React from "react";
import { connect } from "react-redux";

const requireAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = { isAuth: null };

    //is the user logged in? grant access to component, else prompt to sign in page
    componentDidMount() {
      if (this.props.token === "") {
        console.log(this.props);
        this.setState({ isAuth: false });
        this.props.history.push("/signin");
      } else {
        this.setState({ isAuth: true });
      }
    }

    renderComponent() {
      if (this.state.isAuth) {
        return <WrappedComponent {...this.props} isAuth={this.state.isAuth} />;
      }
    }

    render() {
      return <React.Fragment>{this.renderComponent()}</React.Fragment>;
    }
  }

  return connect(mapStateToProps)(HOC);
};

const mapStateToProps = state => {
  return {
    token: state.authToken
  };
};

export default requireAuth;
