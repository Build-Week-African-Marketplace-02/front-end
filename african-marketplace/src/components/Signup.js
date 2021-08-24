import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Link } from "react-router-dom";
import SignupSchema from "../validation/signupSchema";
import axios from "axios";

import styled from "styled-components";

const StyledSignup = styled.div`

display:flex;
justify-content:center;
align-items:center;
height:100vh;

button{
    display:flex;
    justify-content:center;
    border-radius:5px;
    background-color:#ccccff;
    }

    button:hover{
    background-color: grey;
    color: white;
    }

    .signup{
        padding:5rem;
        height:50vh;
        box-shadow:5px 10px 8px 10px #888888;
    }

    #signup-btn{
        margin-top:20%;
        margin-left:40%;
        padding:3%;
    }


input, textarea:focus {
  border: 5px solid #555;
}

  input, textarea{
    display: block;
    padding: .5rem .8rem .5rem .8rem;
    margin: 5% 0;
    border-radius: 5px;
    font-size: 20px;
    border: solid grey 2px;

}

  textarea{
    height: 15vh;
}
`

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
const initialDisabled = false;

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

      .post("https://african-marketplace-44.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          setUsers([res.data, ...users]);
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

  // useEffect(() => {
  //   SignupSchema.isValid(formValues).then(valid => setDisabled(!valid));
  // }, [formValues]);

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
    <StyledSignup>
    <div className="signup container">
      <h1>Sign Up</h1>
      {/* <Link to="/login">
        <button id="login-btn">Login!</button>
      </Link>
      <Link to="/">
        <button id="home-btn">Home</button>
      </Link> */}
      {/* <h3>Sign Up:</h3> */}
      <form id="signup-form" onSubmit={onSubmit}>
        <div className="form-group submit">
          <div className="errors">
            <div>{formErrors.name}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.email}</div>
          </div>
        </div>
        <div className="form-group inputs">
          <h4>User Information:</h4>
            <input
              id="name-signup"
              type="text"
              value={formValues.name}
              onChange={onChange}
              name="name"
              placeholder='username'
            />
            <input
              id="password-signup"
              type="password"
              value={formValues.password}
              onChange={onChange}
              name="password"
              placeholder='password'
            />
            <input
              id="email-signup"
              type="email"
              value={formValues.email}
              onChange={onChange}
              name="email"
              placeholder='email'
            />
        </div>
        <button id="signup-btn" disabled={disabled}>
            SIGN UP
          </button>
      </form>
      {/* {users.map((user, index) => {
        return <User key={index} details={user} />;
      })}{" "} */}
    </div>
    </StyledSignup>
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
