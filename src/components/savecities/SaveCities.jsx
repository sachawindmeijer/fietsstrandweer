import React, {useState, useEffect, useContext} from "react";
import {CityContext} from "../../context/CityContext";
import "./SaveCities.css"
import Button from "../button/Button.jsx";
import axios from "axios";

function SaveCities() {
    const [citiesList, setCitiesList] = useContext(CityContext);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // API-key voor OpenWeatherMap
    const apiKey = import.meta.env.VITE_WEER_API_KEY ;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Max aantal steden checken
        if (citiesList.length >= 3) {
            setError("Het maximum aantal van 3 steden is bereikt.");
            return;
        }

        // Controleer of de stad geldig is
        if (city) {
            setLoading(true);
            setError('');

            try {
                console.log(`Zoeken voor stad: ${city}`); // Toon de stad die we zoeken
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city},nl&appid=${apiKey}&lang=nl`
                );
                console.log("API Respons:", response);
                // Controleer of de stadnaam aanwezig is in de API-respons
                if (response && response.data && response.data.name) {
                    const cityName = response.data.name; // Stadnaam ophalen
                    const cityWeather = response.data.weather[0]?.main; // Weer info ophalen

                    if (cityName && cityWeather) {
                        console.log(`Gevonden stad: ${cityName}, Weer: ${cityWeather}`); // Log de gevonden stad en het weer
                        let uniqueId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
                        let newCity = {
                            id: uniqueId,
                            location: city, // Bewaar de naam van de stad
                        };
                        setCitiesList([newCity, ...citiesList]);
                        setCity('');
                    } else {
                        setError("De stad werd gevonden, maar de weersinformatie is incompleet.");
                    }
                } else {
                    // Als de stad niet gevonden werd
                    setError("Stad niet gevonden. Controleer de naam en probeer het opnieuw.");
                }
            } catch (err) {
                // Log de fout voor debugging
                console.error("Fout tijdens API-aanroep:", err);

                if (err.response) {
                    // Log de status en foutmelding van de API
                    console.error("API foutstatus:", err.response.status);
                    if (err.response.status === 404) {
                        setError("Stad niet gevonden. Controleer de naam en probeer het opnieuw.");
                    } else {
                        setError("Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.");
                    }
                } else {
                    setError("Er is een onbekende fout opgetreden. Probeer het opnieuw.");
                }
            } finally {
                setLoading(false);
            }
        } else {
            setError("Voer een stad in.");
        }
    };
    const deleteCity = (id) => {
        let newCityList = citiesList.filter((city) => city.id !== id);
        setCitiesList([...newCityList]);
    };

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(citiesList));
    }, [citiesList]);

    return (
        <section className="form-savecities-container">
            <h4>Pas jouw voorkeuren hier aan.</h4>
            <p>Opgeslagen steden: (max 3)</p>
            <form onSubmit={handleSubmit} className="input-button-container">
                <div>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Voer hier de locatie in"
                        className={`city-input ${error ? 'error-input' : ''}`}
                    />
                    <Button
                        type="submit"
                        disabled={citiesList.length === 3 || loading}
                        text={loading ? 'Bezig...' : 'Voeg de locatie toe'}
                        className="submit-button"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>

            <section>
                {citiesList.map((city) => {
                    const { id, location } = city;
                    return (
                        <article key={id} className="city-card">
                            <p className="stadnaam">{location}</p>
                            <button
                                type="button"
                                onClick={() => deleteCity(id)}
                                className="button"
                            >Verwijder de stad
                            </button>
                        </article>
                    );
                })}
            </section>
        </section>
    );
}

export default SaveCities