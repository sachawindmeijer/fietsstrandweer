import React from 'react';
import SunnyIcon from '../assets/icons/day.svg';
import RainIcon from '../assets/icons/rainy-6.svg';
import CloudyIcon from '../assets/icons/cloudy.svg';
import SnowIcon from '../assets/icons/snowy-1.svg';
import WindyIcon from '../assets/icons/FeatherWind.svg';
import DrizzleIcon from '../assets/icons/rainy-sun.svg';

const WeatherIcon = ({ type }) => {
    const weatherIcons = {
        Clear: <img src={SunnyIcon} alt="Sunny weather" />,
        Clouds: <img src={CloudyIcon} alt="Cloudy weather" />,
        Drizzle: <img src={DrizzleIcon} alt="Drizzle weather" />,
        Rain: <img src={RainIcon} alt="Rainy weather" />,
        Snow: <img src={SnowIcon} alt="Snowy weather" />,
        default: <img src={WindyIcon} alt="Windy or unclear weather" />,
    };

    return weatherIcons[type] || weatherIcons.default;
};

export default WeatherIcon;
//https://github.com/hogeschoolnovi/frontend-react-weatherapp-tutorial/blob/stap-10-component-mapper/src/helpers/iconMapper.js