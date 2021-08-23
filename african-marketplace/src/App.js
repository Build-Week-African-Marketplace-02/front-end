import React, { useState } from "react";
import "./App.css";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

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
  //function to detect change in input feilds
  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  //set up state
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //POST new user
  const postNewUser = newUser => {
    setFormValues(initialFormValues);
  };
  //Sign up button submit
  const signUpSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      password: formValues.password.trim(),
      email: formValues.email.trim()
    };
    setUsers(newUser);
  };

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
      <Home />
      <Signup
        values={formValues}
        change={inputChange}
        submit={signUpSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <Login 
        values={formValues}
        change={inputChange}
        submit={logInSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  );
}

export default App;
