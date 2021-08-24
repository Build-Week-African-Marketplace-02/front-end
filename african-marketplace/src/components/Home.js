import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledHome = styled.div `
  height: 75vh;
  padding:5rem;
  box-shadow:5px 10px 8px 10px #888888;

  h1 {
    margin-bottom: 5rem;
  }

  #home-main {
    display: flex;
    flex-direction: column;
  }

  .home-image {
    margin: 0 auto;
    height: 45vh;
    width: 85%;
    object-fit: cover;
  }

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

  #home-buttons {
    display: flex;
    justify-content: center;
  }
`

export default function Home() {
  return (
    <StyledHome className="home">
      <h1>African Marketplace</h1>
      <div id='home-main'>
        <img
          className='home-image'
          src='https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'
          alt='Market'
        />
        <div id='home-buttons'>
          <Link to="/signup">
            <button id="signup-btn">Sign Up!</button>
          </Link>
          <Link to="/login">
            <button id="login-btn">Login!</button>
          </Link>
        </div>
      </div>
    </StyledHome>
  );
}
