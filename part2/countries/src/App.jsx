import { useState, useEffect } from "react";

import { Form } from "./components/Form";
import { Countries } from "./components/Countries";
import { Country } from "./components/Country";
import { getAllCountries } from "./service/countries";
import { getCountryWeather } from "./service/weather";

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
        setWeather(null);
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
            getCountryWeather(target).then((response) => setWeather(response));
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
