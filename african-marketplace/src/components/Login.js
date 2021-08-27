import React, { useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
// import { ValidationError } from "yup";

import styled from 'styled-components'

const StyledLogin = styled.div`
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

    #submit{
      padding:3%;
      margin-top:15%;
      margin-left:32.5%;
      background-image: linear-gradient(to right, #7474BF 0%, #348AC7 51%, #7474BF 100%)
  }
    
    .loginDiv{
        padding:5rem;
        height:50vh;
        box-shadow:5px 10px 8px 10px #888888;
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
    <StyledLogin>
    <form id="login-container" onSubmit={onSubmit}>
      <div className='loginDiv'>
      <h1>User Login</h1>
      <div className="form-group login-inputs">

          <input
            value={formValues.email}
            onChange={onChange}
            name="username"
            type="text"
            placeholder='username'
          />

          <input
            value={formValues.password}
            onChange={onChange}
            name="password"
            type="password"
            placeholder='password'
          />

      </div>

      <div className="errors">
        <div>{formErrors.email}</div>
        <div>{formErrors.password}</div>
      </div>

      <button id='submit'>Login</button>
      </div>
    </form>
    </StyledLogin>
  );
}
