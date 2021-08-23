import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router";

export default function Login(props) {
    const {
        values, 
        submit, 
        change, 
        errors,
    } = props 

    const initialState = { // initial state for authorization
        credentials: {
            username: '',
            password: '',
        }
    }

    const [user, setUser] = useState(initialState)
    const { push } = useHistory()

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
        axios.post('http://fakeapi.com', user.credentials)
            .then(res=> {
                localStorage.setItem("token", res.data.payload)
                push('/item-list')
            })
            .catch(err=> {
                console.log(err)
            })
    }

    const onChange = evt => {
        const { name } = evt.target
        change(name)
        setUser({
            credentials: {
                ...user.credentials,
                [evt.target.name]: evt.target.value,
            }
        })
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
