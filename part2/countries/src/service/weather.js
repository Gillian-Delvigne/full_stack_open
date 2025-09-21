import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const getCountryWeather = (target) => {
    const request = axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${target.latlng[0]}&lon=${target.latlng[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
    );
    return request
        .then((response) => {
            return response.data;
        })
        .catch((error) => alert(error));
};

export { getCountryWeather };
