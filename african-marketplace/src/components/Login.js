import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { ValidationError } from "yup";

import styled from 'styled-components'

const StyledLogin = styled.div`
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
    
    .loginDiv{
        padding:5rem;
        height:50vh;
        box-shadow:5px 10px 8px 10px #888888;
    }

    #submit{
        padding:3%;
        margin-top:10%;
        margin-left:40%;
    }

    #login-button{
        margin-top:25%;
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
    <StyledLogin>
    <form id="login-container" onSubmit={onSubmit}>
      <div className='loginDiv'>
      <h1>User Login</h1>
      {/* <Link to="/signup">
        <button className="signup-link">Sign Up</button>
      </Link> /}
      {/ <div className="form-group login-submit">
        <button id="login-button">Login</button>
      </div> */}
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

      <button id='submit' disabled={disabled}>Login</button>
      </div>
    </form>
    </StyledLogin>
  );
}
