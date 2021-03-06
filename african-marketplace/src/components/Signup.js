import React, { useState, useEffect } from "react";
import * as yup from "yup";
// import { Link } from "react-router-dom";
import SignupSchema from "../validation/signupSchema";
import axios from "axios";
import { useHistory } from "react-router";

import styled from "styled-components";

const StyledSignup = styled.div`

display:flex;
justify-content:center;
align-items:center;
height:80vh;

button{
  display:flex;
  justify-content:center;
  border-radius:25px;
  font-family: "Arial Black", Gadget, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.5s;
  width:35%;
  background-size: 200% auto;
  color: #FFF;
  box-shadow: 0 0 20px #eee;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }

  button:hover{
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      margin: 8px 10px 12px;
      background-position: right center;
    }

  .signup{
    padding:5rem;
    height:50vh;
    box-shadow:5px 10px 8px 10px #888888;
  }

  #signup-btn{
    padding:3%;
      margin-top:15%;
      margin-left:32.5%;
      background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6 51%, #2BC0E4 100%)
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
  username: "",
  password: "",
};
//initial error state
const initialFormErrors = {
  username: "",
  password: "",
};

const initialUsers = [];
const initialDisabled = false;

export default function Signup() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const { push } = useHistory();

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
    axios.post("https://african-marketplace-44.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          setUsers([res.data, ...users]);
          push('/login')
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
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };

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
      <form id="signup-form" onSubmit={onSubmit}>
        <div className="form-group submit">
          <div className="errors">
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
          </div>
        </div>
        <div className="form-group inputs">
            <input
              id="name-signup"
              type="text"
              value={formValues.username}
              onChange={onChange}
              name="username"
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
        </div>
        <button id="signup-btn">
            Sign Up
          </button>
      </form>
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
      <h2>username: {details.username}</h2>
      <p>Password: {details.password}</p>
    </div>
  );
};
