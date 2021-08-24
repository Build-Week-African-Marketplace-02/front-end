import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import SignupSchema from "../validation/signupSchema";
import axios from "axios";

const initialFormValues = {
  name: "",
  password: "",
  email: ""
};
//initial error state
const initialFormErrors = {
  name: "",
  password: "",
  email: ""
};

const initialUsers = [];
const initialDisabled = true;

export default function Signup() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //validate the data coming into the input feilds
  const validate = (name, value) => {
    yup
      .reach(SignupSchema, name)
      .validate(value)
      .then(() =>
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      )
      .catch(err =>
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      );
  };
  //function to detect change in input feilds
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  //POST new user
  const postNewUser = newUser => {
    //eventual POST request using axios will go here
    axios
      .post("https://african-marketplace-44.herokuapp.com/auth/api/login", newUser)
      .then(res => {
        setUsers([newUser, ...users]);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      })
  };
  //Sign up button submit
  const signUpSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim()
    };
    postNewUser(newUser);
  };
  //side effects
  useEffect(() => {
    SignupSchema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues]);
  const onSubmit = e => {
    e.preventDefault();
    signUpSubmit();
  };
  const onChange = e => {
    //works with checkboxes too if we add any
    const { name, value, checked, type } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
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
            <div>{formErrors.name}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.email}</div>
          </div>
        </div>
        <div className="form-group inputs">
          <h4>User Information:</h4>
          <label>
            Name:
            <input
              id="name-signup"
              type="text"
              value={formValues.name}
              onChange={onChange}
              name="name"
            />
          </label>
          <label>
            Password:
            <input
              id="password-signup"
              type="password"
              value={formValues.password}
              onChange={onChange}
              name="password"
            />
          </label>
          <label>
            Email:
            <input
              id="email-signup"
              type="email"
              value={formValues.email}
              onChange={onChange}
              name="email"
            />
          </label>
        </div>
      </form>
      {users.map((user, index) => {
        return <User key={index} details={user} />;
      })}{" "}
    </div>
  );
}

const User = ({ details }) => {
  if (!details) {
    return <h3>Working fetching your user details...</h3>;
  }
  return (
    <div className="user container">
      <h2>Name: {details.name}</h2>
      <p>Password: {details.password}</p>
      <p>Email: {details.email}</p>
    </div>
  );
};
