import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { ValidationError } from "yup";
import styled from 'styled-components';

const StyledLogin = styled.form`

.login-inputs {
    display: flex;
    flex-direction: column;
  }

  #login-button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;    
  }

  .signup-link {
    margin-right: 5px;
  }

  label {
    margin-top: 2.5%;
  }

`

const initialFormValues = {
  username: "",
  password: ""
};
//initial error state
const initialFormErrors = {
  username: "",
  password: ""
};

const initialLogin = []
const initialDisabled = true;

export default function Login() {
  const initialState = {
    credentials: {
      username: "",
      password: ""
    }
  };
  //my code starts here
  //state
  const [user, setUser] = useState(initialLogin);
  const { push } = useHistory();

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //function to detect change in input feilds
  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  //POST new user

    //eventual POST request using axios will go here
  //   setUser([loggedUser, ...user]);
  //   setFormValues(initialFormValues);
  // };


  //Sign up button submit
  // const login = () => {
    const postLoggedUser = loggedUser => {
      axios
      .post("https://african-marketplace-44.herokuapp.com/api/auth/login", user.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        push("/item-list");
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  };


  const onSubmit = e => {
    e.preventDefault();
    const loggedUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim()
    };
    postLoggedUser(loggedUser);
  };

  const onChange = e => {
    const { name, value } = e.target;
    inputChange(name, value);
    setUser({
      credentials: {
        ...user.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  //my code ends here

  return (
    <StyledLogin id="login-container" onSubmit={onSubmit}>
      <h1>Login Component</h1>
      <div id='login-button-group'>
        <Link to="/signup">
          <button className="signup-link">Sign Up</button>
        </Link>
        <div className="form-group login-submit">
          <button id="login-button">Login</button>
        </div>
      </div>
      <div className="form-group login-inputs">
        <label>
          Username:&nbsp;
          <input
            value={formValues.email}
            onChange={onChange}
            name="username"
            type="text"
          />
        </label>

        <label>
          Password:&nbsp;
          <input
            value={formValues.password}
            onChange={onChange}
            name="password"
            type="password"
          />
        </label>
      </div>

      <div className="errors">
        <div>{formErrors.email}</div>
        <div>{formErrors.password}</div>
      </div>
    </StyledLogin>
  );
}
