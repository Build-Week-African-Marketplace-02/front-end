import React, { useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { useHistory } from "react-router";

import styled from "styled-components";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./components/Logout";
import ItemCreation from "./components/ItemCreation";
import ItemList from "./components/ItemList";
import Item from "./components/Item";

const StyledApp = styled.div`
  margin: 1rem 3rem;

  a{
    text-decoration: none;
    padding: 1rem 1rem;
    color: black;
  }

  nav{
    display:flex;
    justify-content: flex-end;
    flex-direction: row;
  }

`

function App() {
  const [items, setItems] = useState([])
  const { push } = useHistory();

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    push('/')
  };

  return (
    <StyledApp>
    <div className="App">
      <div>
        <nav>
          <a>
            <Link to="/">Home</Link>
          </a>
          <a>
            <Link to="/item-list">Items</Link>
          </a>
          <a>
            <Link to="/signup">Sign Up</Link>
          </a>
          <a>
            <Link to="/login">Login</Link>
          </a>
          <a href='#' onClick={handleLogout}>Logout</a>
        </nav>
      </div>

      <Switch>
        <PrivateRoute exact path="/protected" component={ItemCreation} />
        <Route path="/item-list" render={props=> <ItemList {...props} items={items}/>} />
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
    </StyledApp>
  );
}

export default App;
