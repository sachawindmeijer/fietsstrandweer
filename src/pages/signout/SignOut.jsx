import "./SignOut.css"
import {useNavigate} from "react-router-dom";
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import Button from "../../components/button/Button.jsx";

function SignOut() {

    const navigate = useNavigate();

    return (
        <div>
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <div className="button-text-container">
                    <span className="button-text-container">
                        <h1>U bent uitgelogd.</h1>
                        <p>Bedankt voor u bezoek en tot snel</p>
                    </span>
                    <p>Iets mis? log dan opnieuw in</p>
                    <Button
                        className="page-button"
                        type="button"
                        onClick={() => navigate('/login')}
                        text='Log In'
                    />
                    <p>of liever naar de homepage</p>
                    <Button
                        className="page-button"
                        type="button"
                        onClick={() => navigate("/")}
                        text='Home'
                    />
                </div>
            </div>
        </div>
    )
}

export default SignOut
