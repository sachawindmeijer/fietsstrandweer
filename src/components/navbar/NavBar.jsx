import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";


function NavBar() {
    const {isAuth, logout} = useContext(AuthContext)
   // const {loggedIn, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">


            </Link>

            {isAuth ?
                <button
                    type="button"
                    onClick={logout}
                >
                    Log uit
                </button>
                :
                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/registreren')}
                    >
                        Registreren
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Home
                    </button>
                </div>
            }
        </nav>
    );
}

export default NavBar;