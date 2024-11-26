import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Home.css'
import kelvinToCelcius from "../../helpers/kelvinToCelsius";
import iconWeather from "../../helpers/iconWeather.jsx";
import windDirection from "../../helpers/windDirection";
import windSpeed from "../../helpers/windSpeed";
import SavedCitiesList from "../../components/savedCitiesList/SavedCitiesList";
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navBar/NavBar";
import Search from "../../components/search/Search.jsx";
import kaart from "../../assets/nlkaart.png"
import Footer from "../../components/footer/Footer.jsx";
import {Link, useNavigate} from 'react-router-dom';
import Button from "../../components/button/Button.jsx";


function Home() {
    const [error, setError] = useState(false);
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const {isAuth} = useContext(AuthContext)


    useEffect(() => {
        async function fetchData() {
            setError(false);
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${import.meta.env.VITE_WEER_API_KEY}&lang=nl`);

                setWeatherData(result.data);
                console.log("home", result.data)
            } catch (e) {
                console.error(e);
                setError(true);

            }
            toggleLoading(false);
        }

        if (location) {
            void fetchData();
        }
    }, [location]);


    return (
        <div>
            <main>
                <div className="background">
                    <HeaderWeather/>
                    <NavBar/>
                    <div className="outer-container">
                        <div className="inner-container">
                            {isAuth ?
                                <section className="saved-cities-list-container">
                                    <SavedCitiesList/>

                                </section>
                                :
                                <article className="saved-cities-logout-container">
                                    <p className="saved-cities-logout-message">
                                        Maak een account of log in om jouw favoriete steden te bewaren en hier te
                                        bekijken.
                                    </p>

                                </article>
                            }
                            <div className="image-and-search-container">
                                <div className="image-container">
                                    <img src={kaart} alt="nederland kaart"/>
                                </div>

                                <section className="weather-search-container">
                                    <Search setLocationHandler={setLocation}/>

                                    {error &&
                                        (<span className="wrong-location-error">
                           De locatie bestaat niet in nederland. Kijk de spelling na.
                        </span>)}

                                    <span className="locationdetails">
                        {loading && (<span>Loading...</span>)}


                                        {weatherData && <article className="weather-data">
                                            <h4>{weatherData.name} {kelvinToCelcius(weatherData.main.temp)}
                                                <div className="icon-wrapper">
                                                    {iconWeather(weatherData.weather[0].main)}
                                                </div>
                                            </h4>
                                            <div className="info-weahter">
                                                <p>{weatherData.weather[0].description}</p>
                                                <p>Windrichting: {windDirection(weatherData.wind.deg)}</p>
                                                <p>Windkracht: {windSpeed(weatherData.wind.speed)}</p>
                                                <p>Luchtvochtigheid: {weatherData.main.humidity}% </p>
                                                <p>Bewolking: {weatherData.clouds.all}%</p>
                                            </div>
                                        </article>
                                        }
                        </span>
                                </section>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>

            </main>

        </div>
    )
}

export default Home

