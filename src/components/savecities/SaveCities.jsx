import React, {useState, useEffect, useContext} from "react";
import {CityContext} from "../../context/CityContext";
import "./SaveCities.css"
import Button from "../button/Button.jsx";

function SaveCities() {
    const [citiesList, setCitiesList] = useContext(CityContext)
    const [city, setCity] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (citiesList.length >= 3) {
            setError(true);
            console.error("Het maximum aantal van 3 steden is bereikt.");
            return;
        }
        if (city) {
            setError(false);
            let uniqueId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newCity = {
                id: uniqueId,
                location: city,
            };

            setCitiesList([newCity, ...citiesList]);
            setCity('')
        } else {
            setError(true)
            setCity('')
        }
    }
    const deleteCity = (id) => {
        let newCityList = citiesList.filter((city) => city.id !== id);

        setCitiesList([...newCityList])
    }

    useEffect(() => {
        localStorage.setItem('cities', JSON.stringify(citiesList));
        console.log("Cities saved to local storage");
    }, [citiesList])

    return (
        <section className="form-savecities-container">
            <h4 >Pas jouw voorkeuren hier aan.</h4>
            <p >Opgeslagen steden: (max 3)</p>
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
                        disabled={citiesList.length === 3}
                        text='Voeg de locatie toe'
                        className="submit-button"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
            </form>

            <section>
                {citiesList.map((city) => {
                    const {id, location} = city;
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
                    )
                })}
            </section>
        </section>
    )
}

export default SaveCities