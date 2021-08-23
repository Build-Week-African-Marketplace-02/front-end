import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Home Component: African Marketplace</h1>
      <Link to="/signup">
        <button id="signup-btn">Sign Up!</button>
      </Link>
      <Link to="/login">
        <button id="login-btn">Login!</button>
      </Link>
    </div>
  );
}
