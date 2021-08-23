import React from "react";

export default function Login(props) {
    const {
        values, 
        submit, 
        change, 
        errors,
    } = props 

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name } = evt.target
        change(name)
    }

  return (
    <form id="login-container" onSubmit={onSubmit}>
      <h1>Login Component</h1>

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

     <div className='form-group login-submit'>
        <button id='login-button'>Login</button>
     </div>

        <div className='errors'>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
        </div>

    </form>
  );
}
