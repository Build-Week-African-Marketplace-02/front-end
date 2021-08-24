import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";

const initialFormValues = {
  username: "",
  password: ""
};
//initial error state
const initialFormErrors = {
  username: "",
  password: ""
};

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
  const [user, setUser] = useState(initialState);
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
  const postLoggedUser = loggedUser => {
    //eventual POST request using axios will go here
    // setUser([loggedUser, ...user]);
    setFormValues(initialFormValues);
  };
  //Sign up button submit
  const login = () => {
    const loggedUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim()
    };
    axios
      .post("https://african-marketplace-44.herokuapp.com/auth/login", user.credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        push("/item-list");
      })
      .catch(err => {
        console.log(err);
      });
    postLoggedUser(loggedUser);
  };

  const onSubmit = e => {
    e.preventDefault();
    login();
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
    <form id="login-container" onSubmit={onSubmit}>
      <h1>Login Component</h1>
      <Link to="/signup">
        <button className="signup-link">Sign Up</button>
      </Link>
      <div className="form-group login-submit">
        <button id="login-button">Login</button>
      </div>
      <div className="form-group login-inputs">
        <label>
          Username:
          <input
            value={formValues.email}
            onChange={onChange}
            name="username"
            type="text"
          />
        </label>

        <label>
          Password:
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
    </form>
  );
}
