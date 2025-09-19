import { useState, useEffect } from "react";
import axios from "axios";

import { Form } from "./components/Form";
import { Countries } from "./components/Countries";
import { Country } from "./components/Country";
import { getAllCountries } from "./service/countries";

function App() {
    const [value, setValue] = useState("");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState(null);

    const handleFieldValue = (event) => {
        event.preventDefault();
        setValue(event.target.value);
        setCountry(null);
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

    return (
        <div>
            <Form inputValue={value} handleFieldValue={handleFieldValue} />

            {value && (
                <div>
                    <Countries
                        countries={countriesTodisplay}
                        handleClick={handleClick}
                    />
                    <Country countries={countriesTodisplay} country={country} />
                </div>
            )}
        </div>
    );
}

export default App;
