import React from 'react';
import Sunny from '../assets/icons/sun.svg';
import Rain from '../assets/icons/rain.svg';
import Clouds from '../assets/icons/clouds.svg';
import Snow from '../assets/icons/snow.svg';
import Wind from '../assets/icons/wind.svg';
import Drizzle from '../assets/icons/sun-rain.svg';

function iconWeather(weatherType) {
    switch (weatherType) {
        case 'Clear':
            return <img src={Sunny} alt="Sunny icon" />;
        case 'Clouds':
            return <img src={Clouds} alt="Clouds icon" />;
        case 'Drizzle':
            return <img src={Drizzle} alt="Drizzle icon" />;
        case 'Rain':
            return <img src={Rain} alt="Rain icon" />;
        case 'Snow':
            return <img src={Snow} alt="Snow icon" />;
        case 'Mist':
        case 'Haze':
        case 'Smoke':
        case 'Fog':
        default:
             return <img src={Wind} alt="Wind icon" />;//wind
    }
}

export default iconWeather;