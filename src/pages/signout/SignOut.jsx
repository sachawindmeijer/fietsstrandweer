import "./SignOut.css"
import {useNavigate} from "react-router-dom";
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";

function SignOut(){

    const navigate = useNavigate();

    return(
        <div>
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <div className="button-text-container">
                    <span className="button-text-container">
                        <p>U bent uitgelogd.</p>
                        <p>Bedankt voor u bezoek en tot snel</p>
                    </span>
                    <p>Iets mis?</p>
                    <button
                        type="button"
                        onClick={() =>  navigate('/signin')}
                        className="page-button"
                    >
                        Log In
                    </button>
                    <p>Uit</p>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="page-button"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SignOut
