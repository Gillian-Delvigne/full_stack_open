import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY

import { Form } from "./components/Form";
import { Countries } from "./components/Countries";
import { Country } from "./components/Country";
import { getAllCountries } from "./service/countries";

function App() {
    const [value, setValue] = useState("");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);

    const handleFieldValue = (event) => {
        event.preventDefault();
        setValue(event.target.value);
        setCountry(null);
        setWeather(null);
    };

    const handleClick = (country) => {
        setCountry(
            countries.find((c) => c.name.common === country.name.common)
        );
    };

    useEffect(() => {
        getAllCountries().then((response) => setCountries(response));
    }, []);

    const countriesTodisplay = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(value.toLowerCase());
    });

    useEffect(() => {
        if (!country && countriesTodisplay.length !== 1) return;
        const target = country ? country : countriesTodisplay[0];


        if (!weather) {
            axios
                .get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${target.latlng[0]}&lon=${target.latlng[1]}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${api_key}`
                )
                .then((response) => {
                    setWeather(response.data);
                })
                .catch((error) => alert(error));
        }
    }, [countriesTodisplay, country]);

    return (
        <div>
            <Form inputValue={value} handleFieldValue={handleFieldValue} />

            {value && (
                <div>
                    <Countries
                        countries={countriesTodisplay}
                        handleClick={handleClick}
                    />
                    <Country
                        countries={countriesTodisplay}
                        country={country}
                        weather={weather}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
