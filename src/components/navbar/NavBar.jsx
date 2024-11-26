import React, {useContext} from "react";
import {Link,} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./NavBar.css"


function NavBar() {
    const {isAuth, logout} = useContext(AuthContext)


    return (
        <nav className="nav-bar">
                               <ul className="nav-links">
                        <li className="links">
                            <Link to="/">Home
                            </Link>
                        </li>

                        <li className="links">
                            {isAuth ?
                                <Link
                                    to="/loguit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        logout();
                                        console.log('Logout clicked');
                                    }}
                                >
                                    Log out
                                </Link> : <Link
                                    to="/login"
                                >
                                    log in
                                </Link>}
                            </li>
                            <li className="links">
                                <Link
                                    to="/registreren"
                                >Registreren
                                </Link>
                            </li>
                    </ul>
        </nav>
    )
}


export default NavBar;