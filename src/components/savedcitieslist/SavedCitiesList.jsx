import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {CityContext} from "../../context/CityContext";
import {PreferencesContext} from "../../context/PreferencesContext";
import WeatherCard from "../weatherCard/WeatherCard";


function SavedCitiesList() {
    const [cityList] = useContext(CityContext)
    const [preferencesList] = useContext(PreferencesContext)
    const [cityListWeatherData, setCityListWeatherData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const exec = async () => {
            setError(false)
            try {
                const cityListWeather = await Promise.all(cityList.map(city => {
                    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.location}&appid=${import.meta.env.REACT_APP_API_KEY}&lang=nl`)
                }))
                const filteredArr = cityListWeather.map((data) => {
                    return {
                        data: data.data
                    }
                });
                const changedArray = filteredArr.map((city) => {
                    const weightedTemperature = ((city.data.main.temperature / 100) * preferencesList.preferredWeather.temperature)
                    const weightedCloudiness = ((city.data.clouds.all / 100) * preferencesList.preferredWeather.cloudiness)
                    const weightedWindspeed = ((city.data.wind.speed / 100) * preferencesList.preferredWeather.windspeed)
                    const weightedScore = (weightedTemperature + weightedCloudiness + weightedWindspeed).toFixed(2)
                    return city.data = {...city.data, score: weightedScore};
                });
                changedArray.sort((a, b) => b.score - a.score)
                setCityListWeatherData(changedArray)
            } catch (e) {
                console.error(e)
                setError(true)
            }
        }
        void exec();
    }, [cityList])


    return (
        error ?
            <span className="weather-error">
               <p>Er is iets mis gegaan met het ophalen van de gegevens. </p>
                <p>Kijk nog eens locatienamen in jouw profiel na en wijzig ze desnoods en probeer het nog eens.</p>
            </span>
            :
            cityListWeatherData.length === 0 ?
                <span className="weather-error">
                    <p>Het lijkt dat je momenteel nog geen locaties heb opgeslagen.</p>
                </span>
                :
                isNaN(cityListWeatherData[0].score) ?
                    <span className="weather-error">
                         <p>Het lijkt dat je momenteel nog geen weersvoorkeuren aangegeven in jouw profiel. Pas deze aan en sla ze op en probeer het nog eens</p>
                    </span>
                    :
                    <section className="weatherCards">
                        {cityListWeatherData && cityListWeatherData.map((cityWeather) => {
                            return <WeatherCard
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
                        })}
                    </section>
    )
}

export default SavedCitiesList