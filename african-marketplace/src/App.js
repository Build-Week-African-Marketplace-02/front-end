import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";

import * as yup from "yup";
import SignupSchema from "./validation/signupSchema";
import axiosWithAuth from './components/axiosWithAuth'

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";
import ItemCreation from './components/ItemCreation'
import ItemList from "./components/ItemList";
import Item from './components/Item'


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

  const handleLogout = (e) => { //api call to remove token when log out is clicked
    e.preventDefault()
    axiosWithAuth()
      .post('http://localhost:5000/api/logout')
      .then(res=> {
        localStorage.removeItem("token")
        window.location.href = 'http://localhost:3000/api/login'
      })
  }

  return (
    <div className="App">
      <div>
        <nav>
          <a><Link to='/'>Home</Link></a>
          <a><Link to='/signup'>Sign Up</Link></a>
          <a><Link to='/login'>Login</Link></a>
          <a onClick={handleLogout}>Logout</a>
          <a><Link to='/item-list'>Items</Link></a>
        </nav>
      </div>

      <Switch>
        <PrivateRoute exact path = '/protected' component = {ItemCreation}/>
        <Route path = '/item-list' component = {ItemList}/>
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

        <Route path="/item/:id">
              <Item/>
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
 