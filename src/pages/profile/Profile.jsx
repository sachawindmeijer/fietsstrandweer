import React from "react";
import './Profile.css'
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import SaveCities from "../../components/savecities/SaveCities.jsx";
import Preferences from "../../components/preferences/Preferences.jsx";
import Footer from "../../components/footer/Footer.jsx";


function Profile() {
    return (
        <div>
            <main>
                <div className="background">
                    <HeaderWeather/>
                    <NavBar/>
                    <div className="outer-container">

                        <div className="city-and-preferences-container">
                            <section className="saved-cities-container">
                                <SaveCities/>
                            </section>
                            <section className="preferences-container">
                                <Preferences/>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Profile;