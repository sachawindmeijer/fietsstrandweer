import kelvinToCelcius from "../../helpers/kelvinToCelsius";
import iconWeather from "../../helpers/iconWeather.jsx";
import windDirection from "../../helpers/windDirection";
import windSpeed from "../../helpers/windSpeed";
import windSockIcon from "../../assets/icons/windsock.jpg"
import humidityIcon from "../../assets/icons/humidity.png"
import cloudIcon from "../../assets/icons/clouds blue.png"
import "./WeatherCard.css"

function WeatherCard({
                         name,
                         tempK,
                         score,
                         weatherMain,
                         weatherDescription,
                         windDegree,
                         weatherWindSpeed,
                         humidity,
                         clouds,
                         id,
                     }) {
    return (
        <article className="weather-card" key={id}>
<div className="weather-name-score">
    <h4>{name}</h4>
    <p>Score: {score}</p>
</div>
            <div className="weather-description">
                <p>{kelvinToCelcius(tempK)}</p>
                <div className="icon-wrapper">
                    {iconWeather(weatherMain)}
                </div>
                <p>{weatherDescription}</p>
            </div>
            <div className="weather-flex">
                <p><span className="flex"><img src={windSockIcon} alt="Windsok" width="20"/>
                :{windSpeed(weatherWindSpeed)}, {windDirection(windDegree)}</span></p>
                <p><span className="flex"><img src={humidityIcon} alt="Luchtvochtigheid" width="20"/>
                :{humidity}%</span> </p>
                <p><span className="flex"><img src={cloudIcon} alt="bewolkt" width="20" />
                :{clouds}%</span> </p>
            </div>
        </article>
    )
}

export default WeatherCard