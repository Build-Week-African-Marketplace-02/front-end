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


const StyledApp = styled.div`
  margin: 1rem 3rem;

  a{
    text-decoration: none;
    padding: 1rem 1rem;
    color: black;
    height: 2rem;
  }

  nav{
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 5.5rem;
    padding-bottom: 1.5rem;
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

  const onClickLogo = (e) => {
    push('/')
  }

  return (
    <StyledApp>
    <div className="App">
      <div>
        <nav>
        <img src ="https://drive.google.com/thumbnail?id=1AN7Ds-qt464BCXEh6ux_gso6BWkAIPJ6" className="logo" onClick={onClickLogo}></img>
        <div id='nav-links'>
          <a>
            {localStorage.getItem('token') && <Link to='protected'>Post Item</Link>} {/*nav only appears when logged in and you have to manually refresh for it to show up*/}
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
          </div>
        </nav>
      </div>

      <Switch>
        <PrivateRoute exact path="/protected" component={ItemCreation} />
        <Route path="/item-list" render={() => <ItemList />}/>
        <PrivateRoute path="/logout" component={Logout} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route path="/">
          <Home />
        </Route>

      </Switch>
    </div>
    </StyledApp>
  );
}

export default App;
