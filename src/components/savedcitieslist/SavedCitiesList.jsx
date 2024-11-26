import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PreferencesContext } from "../../context/PreferencesContext";
import { CityContext } from "../../context/CityContext.jsx";
import WeatherCard from "../weatherCard/WeatherCard";
import Button from "../button/Button.jsx";
import {Link, useNavigate} from 'react-router-dom';

function SavedCitiesList() {
    const [cityList] = useContext(CityContext);
    const [preferencesList] = useContext(PreferencesContext);
    const [cityListWeatherData, setCityListWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setCityListWeatherData([]);

            try {
                const apiKey = import.meta.env.VITE_WEER_API_KEY ;
                if (!apiKey) {
                    console.error("API-key ontbreekt. Controleer je .env-bestand.");
                    setError(true);
                    return;
                }
                const cityWeatherPromises = cityList.map((city) =>
                    axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city.location},nl&appid=${apiKey}&lang=nl`
                    )
                );

                const cityWeatherResponses = await Promise.all(cityWeatherPromises);

                const processedData = cityWeatherResponses.map((response) => {
                    const { data } = response;

                    const weightedTemperature =
                        ((data.main.temp || 0) / 100) * (preferencesList.preferredWeather.temperature || 1);
                    const weightedCloudiness =
                        ((data.clouds.all || 0) / 100) * (preferencesList.preferredWeather.cloudiness || 1);
                    const weightedWindspeed =
                        ((data.wind.speed || 0) / 100) * (preferencesList.preferredWeather.windspeed || 1);

                    const weightedScore = parseFloat(
                        weightedTemperature + weightedCloudiness + weightedWindspeed
                    ).toFixed(2)

                    return {
                        ...data,
                        score: parseFloat(weightedScore),
                    };
                });

                processedData.sort((a, b) => b.score - a.score); // Sort by score
                setCityListWeatherData(processedData);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        };

        fetchData();
    }, [cityList, preferencesList]);

    if (error) {
        return (
            <span className="weather-error">
        <p>Er is iets mis gegaan met het ophalen van de gegevens. </p>
        <p>
          Kijk nog eens locatienamen in jouw profiel na en <Link
            to="/profiel">wijzig</Link> ze desnoods en
          probeer het nog eens.
        </p>
      </span>
        );
    }

    if (cityListWeatherData.length === 0) {
        return (
            <span className="weather-error">
        <p>Het lijkt dat je momenteel nog geen locaties heb opgeslagen.</p>
      </span>
        );
    }

    if (isNaN(cityListWeatherData[0].score)) {
        return (
            <span className="weather-error">
        <p>
          Het lijkt dat je momenteel nog geen weersvoorkeuren aangegeven in jouw
          profiel. Pas deze aan en sla ze op en probeer het nog eens
        </p>
      </span>
        );
    }

    return (
        <section className="weatherCards">

            {cityListWeatherData.map((cityWeather) => (
                <WeatherCard
                    key={cityWeather.name}
                    name={cityWeather.name}
                    tempK={cityWeather.main.temp}
                    score={cityWeather.score}
                    weatherMain={cityWeather.weather[0].main}
                    weatherDescription={cityWeather.weather[0].description}
                    windDegree={cityWeather.wind.deg}
                    weatherWindSpeed={cityWeather.wind.speed}
                    humidity={cityWeather.main.humidity}
                    clouds={cityWeather.clouds.all}
                />
            ))}

            <Button
                className="page-button"
                type="button"
                onClick={() => navigate('/profiel')}
                text='wijzig'
            />
        </section>

    );
}

export default SavedCitiesList;