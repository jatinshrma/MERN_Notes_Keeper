import React, { useState } from 'react'

const Signup = (props) => {

    const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "", conPassword: "" })
    let signupHandler = "";
    const onChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }
    signupHandler = async (e) => {

        e.preventDefault();
        const host = "http://localhost:5000"
        await fetch(`${host}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        });
        props.showAlert('success', 'Succeed', 'Profile Created Successfully.')
        setSignUpData({ name: "", email: "", password: "", conPassword: "" })
    }
    const wrong = (e) => {
        e.preventDefault();
        props.showAlert('danger', 'Error', "Password entries don't match")
    }
    return (
        <div>
            <form onSubmit={signUpData.conPassword === signUpData.password ? signupHandler : wrong}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" name="name" value={signUpData.name} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={signUpData.email} onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={signUpData.password} onChange={onChange} min={8} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="conPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="conPassword" value={signUpData.conPassword} onChange={onChange} min="8" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>
    )
}

export default Signup
