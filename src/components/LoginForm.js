import React from "react";
import PropTypes from "prop-types";
import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

const LoginForm = ({ onChange, onSubmit }) => {
  return (
    <Card className="container">
      <form action="">
        <h2 className="card-heading">Login</h2>
        <div className="field_line">
          <TextField
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={onChange}
          />
        </div>
        <div className="field_line">
          <TextField
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>

        <div className="button-line">
          <RaisedButton onClick={onSubmit} label="Login" />
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};
