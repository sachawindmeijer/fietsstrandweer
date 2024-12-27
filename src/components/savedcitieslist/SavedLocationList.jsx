import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PreferencesContext } from "../../context/PreferencesContext";
import { LocationContext } from "../../context/LocationContext.jsx";
import WeatherCard from "../weatherCard/WeatherCard";
import Button from "../button/Button.jsx";
import {Link, useNavigate} from 'react-router-dom';
import {fetchWeather} from "../../helpers/weather.jsx";

function SavedLocationList() {
    const [locationList] = useContext(LocationContext);
    const [preferencesList] = useContext(PreferencesContext);

    const [locationListWeatherData, setLocationListWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeatherData = async () => {
            setError(null);
            setLocationListWeatherData([]);

            if (!locationList || locationList.length === 0) {
                setError("Het lijkt dat je momenteel nog geen locaties hebt opgeslagen.");
                return;
            }

            if (!preferencesList || !preferencesList.preferredWeather) {
                setError("Je hebt nog geen weersvoorkeuren ingesteld. Pas deze aan in je profiel.");
                return;
            }

            const apiKey = import.meta.env.VITE_WEER_API_KEY;
            if (!apiKey) {
                console.error("API-key ontbreekt. Controleer je .env-bestand.");
                setError("Er is een probleem met de API-sleutel. Neem contact op met de beheerder.");
                return;
            }

            try {
                const weatherData = [];

                for (const place of locationList) {
                    try {
                        const data = await fetchWeather(place.location);

                        const weightedTemperature =
                            ((data?.main?.temp || 0) / 100) * (preferencesList.preferredWeather.temperature || 1);
                        const weightedCloudiness =
                            ((data?.clouds?.all || 0) / 100) * (preferencesList.preferredWeather.cloudiness || 1);
                        const weightedWindspeed =
                            ((data?.wind?.speed || 0) / 100) * (preferencesList.preferredWeather.windspeed || 1);

                        const weightedScore = (
                            weightedTemperature + weightedCloudiness + weightedWindspeed
                        ).toFixed(2);

                        weatherData.push({
                            ...data,
                            score: parseFloat(weightedScore),
                        });
                    } catch (err) {
                        console.error(`Fout bij ophalen van gegevens voor ${city.location}:`, err);
                        setError(`Fout bij ophalen van gegevens voor ${city.location}. Controleer de naam.`);
                    }
                }

                weatherData.sort((a, b) => b.score - a.score); // Sorteer op score
                setLocationListWeatherData(weatherData);
            } catch (error) {
                console.error("Algemene fout bij ophalen van gegevens:", error);
                setError("Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.");
            }
        };

       void fetchWeatherData();
    }, [locationList, preferencesList]);

    if (error) {
        return (
            <span className="weather-error">
                <p>{error}</p>
                {error.includes("profiel") && (
                    <p>
                        <Link to="/profiel">Wijzig je profiel</Link> en probeer het opnieuw.
                    </p>
                )}
            </span>
        );
    }

    if (locationListWeatherData.length === 0) {
        return (
            <span className="weather-error">
                <p>Het lijkt dat je momenteel nog geen locaties hebt opgeslagen.</p>
            </span>
        );
    }

    if (isNaN(locationListWeatherData[0]?.score)) {
        return (
            <span className="weather-error">
                <p>
                    Het lijkt dat je momenteel nog geen weersvoorkeuren hebt aangegeven in jouw
                    profiel. Pas deze aan en sla ze op en probeer het nog eens.
                </p>
            </span>
        );
    }

    return (
        <section className="weatherCards">
            {locationListWeatherData.map((locationWeather) => (
                <WeatherCard
                    key={locationWeather.name}
                    name={locationWeather.name}
                    tempK={locationWeather.main?.temp}
                    score={locationWeather.score}
                    weatherMain={locationWeather.weather?.[0]?.main}
                    weatherDescription={locationWeather.weather?.[0]?.description}
                    windDegree={locationWeather.wind?.deg}
                    weatherWindSpeed={locationWeather.wind?.speed}
                    humidity={locationWeather.main?.humidity}
                    clouds={locationWeather.clouds?.all}
                />
            ))}
            <Button
                className="page-button"
                type="button"
                onClick={() => navigate('/profiel')}
                text="Wijzig"
            />
        </section>
    );
}

export default SavedLocationList;

