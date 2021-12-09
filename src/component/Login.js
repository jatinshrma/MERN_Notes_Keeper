import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const history = useHistory()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const loginHandler = async (e) => {

        e.preventDefault();
        const host = "http://localhost:5000"
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const content = await response.json();
        props.showAlert('success', 'Succeed', 'Logged in successfully.')
        if (content.Token) {localStorage.setItem('Token', content.Token); history.push('/');} else { console.log('Credentials are not valid.') }
    }
    return (
        <div className="container justify-content-center">
            <form onSubmit={loginHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} min="8" required />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
        </div>
    )
}

export default Login
