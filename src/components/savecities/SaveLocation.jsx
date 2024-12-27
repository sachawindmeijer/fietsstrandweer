import React, {useState, useEffect, useContext} from "react";
import {LocationContext} from "../../context/LocationContext.jsx";
import "./SaveCities.css"
import Button from "../button/Button.jsx";
import axios from "axios";
import {fetchWeather} from "../../helpers/weather.jsx";


function SaveLocation() {
    const [locationList, setLocationList] = useContext(LocationContext);
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Maximaal aantal locaties controleren
        if (locationList.length >= 3) {
            setError("Het maximum aantal van 3 locaties is bereikt.");
            return;
        }

        // Controleer of een locatie is ingevoerd
        if (!location.trim()) {
            setError("Voer een locatie in.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await fetchWeather(location);

            if (data && data.name) {
                const locationName = data.name; // Haal de locatie op

                // Unieke ID genereren
                const uniqueId = `${new Date().getTime().toString(36)}${new Date().getUTCMilliseconds()}`;

                // Nieuwe locatie aanmaken
                const newLocation = {
                    id: uniqueId,
                    location: locationName,
                };

                // Locatielijst bijwerken
                setLocationList([newLocation, ...locationList]);
                setLocation(''); // Inputveld resetten
            } else {
                setError("De locatie werd gevonden, maar de informatie is incompleet.");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                setError("Locatie niet gevonden. Controleer de naam en probeer het opnieuw.");
            } else {
                setError("Er is een probleem met het ophalen van gegevens. Probeer het later opnieuw.");
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteLocation = (id) => {
        // Locatie verwijderen op basis van ID
        const updatedList = locationList.filter((loc) => loc.id !== id);
        setLocationList(updatedList);
    };

    useEffect(() => {
        // Opslaan in localStorage
        localStorage.setItem('locations', JSON.stringify(locationList));
    }, [locationList]);

    return (
        <section className="form-savelocation-container">
            <h4>Pas jouw voorkeuren hier aan.</h4>
            <p>Opgeslagen locaties: (max 3)</p>
            <form onSubmit={handleSubmit} className="input-button-container">
                <div>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Voer hier de locatie in"
                        className={`location-input ${error ? 'error-input' : ''}`}
                    />
                    <Button
                        type="submit"
                        disabled={locationList.length >= 3 || loading}
                        text={loading ? 'Bezig...' : 'Voeg de locatie toe'}
                        className="submit-button"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>

            <section>
                {locationList.map(({ id, location }) => (
                    <article key={id} className="location-card">
                        <p className="location-name">{location}</p>
                        <button
                            type="button"
                            onClick={() => deleteLocation(id)}
                            className="delete-button"
                        >
                            Verwijder de locatie
                        </button>
                    </article>
                ))}
            </section>
        </section>
    );
}

export default SaveLocation;