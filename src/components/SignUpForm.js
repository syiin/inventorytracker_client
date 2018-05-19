import React from "react";

import { Card } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

const SignUpForm = ({ onChange, onSubmit }) => {
  return (
    <Card className="container">
      <form action="">
        <h2 className="card-heading">Create New User</h2>
        <div className="field-line">
          <TextField
            type="text"
            name="username"
            placeholder="username"
            onChange={onChange}
          />
        </div>
        <div className="field-line">
          <TextField
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
          />
        </div>
        <div className="field-line">
          <input type="radio" name="isAdmin" value="true" onChange={onChange} />Is
          Admin
        </div>
        <div className="field-line">
          <input
            type="radio"
            name="isAdmin"
            value="false"
            onChange={onChange}
          />Is NOT Admin
        </div>
        <div className="button-line">
          <RaisedButton
            type="submit"
            onClick={onSubmit}
            label="Register New User"
          />
        </div>
      </form>
    </Card>
  );
};

export default SignUpForm;
