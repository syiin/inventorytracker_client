import React from "react";
import LoginForm from "../components/LoginForm";
import {
  apiCall,
  authenticateUser,
  forwardToken,
  pathString
} from "../services/api";

class LoginPage extends React.Component {
  state = {
    user: {
      username: "",
      password: "",
      isAdmin: false
    }
  };

  onSubmit = event => {
    event.preventDefault();
    const method = "POST";
    const path = `${pathString}/api/login`;
    const user = this.state.user;
    apiCall(method, path, user).then(res => {
      authenticateUser(res.username, res.token, res.isAdmin);
      forwardToken();
      this.props.setCurrentUser(res);
      this.props.history.push({
        pathname: "/stocklist"
      });
    });
  };

  onChange = event => {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({
      user
    });
  };

  render() {
    return <LoginForm onChange={this.onChange} onSubmit={this.onSubmit} />;
  }
}

export default LoginPage;
