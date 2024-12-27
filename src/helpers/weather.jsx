import axios from "axios";

export async function fetchWeather(location) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${import.meta.env.VITE_WEER_API_KEY}&lang=nl`);
        return response.data;
    }catch (error){
        console.error("Error fetching weather:", error);
        throw error;
    }
}