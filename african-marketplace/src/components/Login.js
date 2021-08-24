import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  //my code starts here
  //state
  const [loggedUsers, setLoggedUsers] = useState([]);
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
  const postLoggedUser = logged => {
    //eventual POST request using axios will go here
    setLoggedUsers([logged, ...loggedUsers]);
    setFormValues(initialFormValues);
  };
  //Sign up button submit
  const login = () => {
    const loggedUser = {
      username: formValues.email.trim(),
      password: formValues.password.trim()
    };
    postLoggedUser(loggedUser);
  };

  const onSubmit = e => {
    e.preventDefault();
    postLoggedUser();
  };
  const onChange = e => {
    //works with checkboxes too if we add any
    const { name, value } = e.target;
    inputChange(name, value);
  };
  //my code ends here

  return (
    <form id="login-container" onSubmit={onSubmit}>
      <h1>Login Component</h1>
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
            type="email"
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
