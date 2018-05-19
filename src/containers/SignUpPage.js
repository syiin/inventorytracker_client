import React from "react";
import SignUpForm from "../components/SignUpForm";
import { apiCall, pathString } from "../services/api";

class SignUpPage extends React.Component {
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
    const path = `${pathString}/api/registeruser`;
    const user = this.state.user;
    user.isAdmin = user.isAdmin === "true";
    apiCall(method, path, user).then(res => {
      console.log(res);
      alert("USER SUCCESSFULLY CREATED");
    });
  };

  onChange = event => {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  render() {
    return <SignUpForm onChange={this.onChange} onSubmit={this.onSubmit} />;
  }
}

export default SignUpPage;
