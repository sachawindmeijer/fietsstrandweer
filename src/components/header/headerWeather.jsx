import React from "react";
import {useLocation} from "react-router-dom";
import './HeaderWeather.css'

function HeaderWeather({ title, onClick }) {
    const location = useLocation();

    function getPageName() {
        switch (location.pathname) {
            case "/" :
                return "Home";
            case "/login" :
                return "Login";
            case "/registreren" :
                return "Account Registratie";
            case "/profiel" :
                return "Profiel";
            case "/loguit" :
                return "Loguit";
            default:
                return "Onbekende pagina";
        }
    }

    return (
        <header className="headerBar" onClick={onClick}>
            <h1>{title}</h1>
            <h3>{getPageName()}</h3>
        </header>
    );
}

export default HeaderWeather;