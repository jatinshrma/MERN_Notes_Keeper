import React from 'react'
import { Link, useLocation, useHistory} from "react-router-dom";

const Navbar = () => {
    
    const history = useHistory();
    const location = useLocation();

    const logoutHandler= ()=>{
        localStorage.removeItem('Token')
        history.push('/login')
    }
    return (
        <div className="sticky-top" style={{top:'56'}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={localStorage.getItem('Token')? "/": "/login"}>iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`}aria-current="page" to={localStorage.getItem('Token')? "/": "/login"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('Token')? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login">Login</Link>
                            <Link className="btn btn-primary" to="/signup">Signup</Link>
                        </form>: <button className="btn btn-primary" onClick={logoutHandler}>Log out</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar
