import React from 'react';
import Sunny from '../assets/icons/sun.svg';
import Rain from '../assets/icons/rain.svg';
import Clouds from '../assets/icons/clouds.svg';
import Snow from '../assets/icons/snow.svg';
import  Wind from '../assets/icons/wind.svg';
import Drizzle from '../assets/icons/sun-rain.svg';

function iconWeather(weatherType) {
    switch (weatherType) {
        case 'Clear':
            return <Sunny/>;
        case 'Clouds':
            return <Clouds/>;
        case 'Drizzle':
            return <Drizzle/>;
        case 'Rain':
            return <Rain/>;
        case 'Snow':
            return <Snow/>;
        case 'Mist':
        case 'Haze':
        case 'Smoke':
        case 'Fog':
        default:
            return <Wind/>;
    }
}

export default iconWeather;