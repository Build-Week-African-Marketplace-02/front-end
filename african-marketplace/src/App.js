import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import * as yup from "yup";
import SignupSchema from "./validation/signupSchema";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";

//initial values for state

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

function App() {
  //set up state
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //helper functions

  //validate the data coming into the input feilds
  const validate = (name, value) => {
    yup
      .reach(SignupSchema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
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
    setUsers([newUser, ...users]);
    setFormValues(initialFormValues);
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

  //Login button submit
  const logInSubmit = () => {
    const loggedUser= {
      username: formValues.email.trim(),
      password: formValues.password.trim()
    };

  }

  return (
    <div className="App">
      <h1>APP JS</h1>

      <Switch>
        <PrivateRoute exact path = '/protected' component = {ItemCreation}/>
        <PrivateRoute path = '/logout' component = {Logout}/>
        <Route path="/signup">
          <Signup
            values={formValues}
            change={inputChange}
            submit={signUpSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
<Route path="/login">
          <Login 
        values={formValues}
        change={inputChange}
        submit={logInSubmit}
        disabled={disabled}
        errors={formErrors}
      />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      {users.map((user, index) => {
        return <User key={index} details={user} />;
      })}

    </div>
  );
}

export default App;

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
