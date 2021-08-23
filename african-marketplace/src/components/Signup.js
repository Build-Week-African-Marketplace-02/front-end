import React from "react";
import { Link } from "react-router-dom";

export default function Signup(props) {
  //destructure props
  const { values, submit, change, disabled, errors } = props;
  const onSubmit = e => {
    e.preventDefault();
    submit();
  };
  const onChange = e => {
    //works with checkboxes too if we add any
    const { name, value, checked, type } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };
  return (
    <div className="signup container">
      <h1>Sign Up Component</h1>
      <Link to="/login">
        <button id="login-btn">Login!</button>
      </Link>
      <Link to="/">
        <button id="home-btn">Home</button>
      </Link>
      <h3>Sign Up:</h3>
      <form id="signup-form" onSubmit={onSubmit}>
        <div className="form-group submit">
          <button id="signup-btn" disabled={disabled}>
            SIGN UP
          </button>
          <div className="errors">
            <div>{errors.name}</div>
            <div>{errors.password}</div>
            <div>{errors.email}</div>
          </div>
        </div>
        <div className="form-group inputs">
          <h4>User Information:</h4>
          <label>
            Name:
            <input
              id="name-signup"
              type="text"
              value={values.name}
              onChange={onChange}
              name="name"
            />
          </label>
          <label>
            Password:
            <input
              id="password-signup"
              type="password"
              value={values.password}
              onChange={onChange}
              name="password"
            />
          </label>
          <label>
            Email:
            <input
              id="email-signup"
              type="email"
              value={values.email}
              onChange={onChange}
              name="email"
            />
          </label>
        </div>
      </form>
    </div>
  );
}
