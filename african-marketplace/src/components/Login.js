import React from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
    const {
        values, 
        submit, 
        change,
        disabled, 
        errors,
    } = props 

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

  return (
    <form id="login-container" onSubmit={onSubmit}>
      <h1>Log In Component</h1>

      <div className='form-group login-inputs'>
        <label>Username:
            <input 
                value={values.email}
                onChange={onChange}
                name='username'
                type='text'
            />
        </label>

        <label>Password:
            <input 
                value={values.password}
                onChange={onChange}
                name='password'
                type='text'
            />
        </label>
      </div> 

      <Link to="/signup">
        <button id="signup-btn">Sign Up</button>
      </Link>

     <div className='form-group login-submit'>
        <button id='login-button' disabled={disabled}>Login</button>
     </div>

        <div className='errors'>
            <div>{errors.username}</div>
            <div>{errors.password}</div>
        </div>

    </form>
  );
}
