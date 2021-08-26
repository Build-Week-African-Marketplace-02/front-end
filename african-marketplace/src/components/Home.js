import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledHome = styled.div `
  height: 75vh;
  padding: .5rem 1rem;
  box-shadow:5px 10px 8px 10px #888888;

  header {
    background-image:url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
    background-repeat: no-repeat;
    background-size: cover;
    height: 30%;
    
  }

  h1 {
    padding-top: 3rem;
    font-size: 2em;
    color: #fff;
    text-shadow:
      -1.5px -1.5px 0 #000,  
      1.5px -1.5px 0 #000,
      -1.5px 1.5px 0 #000,
      1.5px 1.5px 0 #000;
  }

  header p {
    width: 80%;
    margin: 0 auto;
    background-color: rgba(255,255,255,.65);
    padding: 1rem;
    color: #000;
    font-weight: bold;
  }

  #main {
    display: flex;
    flex-direction: column;
  }

  button{
    display:flex;
    padding: 5px;
    justify-content:center;
    border-radius:5px;
    background-color:#f4c5be;
    font-size: 1em;
    }

    button:hover{
    background-color: #6ba393;
    color: white;
    }

  #home-buttons {
    display: flex;
    justify-content: center;
  }

  #home-content {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    height: 65%;
  }

  .container {
    width: 30%;
    padding: 2px;;
    background-color: #f4c5be;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .container img {
    width: 70%;
   
  }

  .container p {
    padding: 5px;
  }

  h2 {
    color: #6ba393;
    font-weight: bold;
  }

  
`

export default function Home() {

  return (
    <StyledHome className="home">
      <header>
      <h1>African Marketplace</h1>
      <p>Sauti Africa empowers small business owners, particularly women, to improve their business and economic opportunities to grow out of poverty.</p>
      <div id='main'>
        <div id='home-buttons'>
          <Link to="/signup">
            <button id="signup-btn">Sign Up!</button>
          </Link>
          <Link to="/login">
            <button id="login-btn">Login!</button>
          </Link>
        </div>
      </div>
      </header>
      <div id='home-content'>
        <div id='container1' className='container'>
          <h2>Account Access</h2>
          <img src='https://images.unsplash.com/photo-1618060932014-4deda4932554?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'/>
          <p>Create a new account or login with a current account to access your personal marketplace and make changes. </p>
        </div>
        <hr></hr>
        <div id='container2' className='container'>
          <h2>Browser Market Items</h2>
          <img src='https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'/>
          <p>Browse hundreds of market items from multiple locations.</p>
        </div>
        <hr></hr>
        <div id='container3' className='container'>
          <h2>Sell Items in Your Market</h2>
          <img src='https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80'/>
          <p>With an African Makert account, business owners can easily post new items for sale daily.</p>
        </div>
      </div>
      
    </StyledHome>
  );
}
