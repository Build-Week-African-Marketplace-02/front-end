import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";

import axiosWithAuth from "./components/axiosWithAuth";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";
import ItemCreation from "./components/ItemCreation";
import ItemList from "./components/ItemList";
import Item from "./components/Item";

function App() {
  const handleLogout = e => {
    //api call to remove token when log out is clicked
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/logout")
      .then(res => {
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/api/login";
      });
  };

  return (
    <div className="App">
      <div>
        <nav>
          <a>
            <Link to="/">Home</Link>
          </a>
          <a>
            <Link to="/signup">Sign Up</Link>
          </a>
          <a>
            <Link to="/login">Login</Link>
          </a>
          <a onClick={handleLogout}>Logout</a>
          <a>
            <Link to="/item-list">Items</Link>
          </a>
        </nav>
      </div>

      <Switch>

        <PrivateRoute exact path="/protected" component={ItemCreation} />
        <Route path="/item-list" component={ItemList} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />

        <Route path="/login" component={Login} />

       


        <Route path="/item/:id">
          <Item />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
