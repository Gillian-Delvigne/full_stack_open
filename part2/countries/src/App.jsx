import { useState, useEffect } from "react";

import { Form } from "./components/Form";
import { Countries } from "./components/Countries";
import { Country } from "./components/Country";
import { getAllCountries } from "./service/countries";

function App() {
    const [value, setValue] = useState("");
    const [countries, setCountries] = useState([]);

    const handleFieldValue = (event) => {
        event.preventDefault();
        setValue(event.target.value);
    };

    useEffect(() => {
        getAllCountries().then((response) => setCountries(response));
    }, []);

    const countriesToDisplay = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(value.toLowerCase());
    });

    return (
        <div>
            <Form inputValue={value} handleFieldValue={handleFieldValue} />

            {value && (
                <div>
                    <Countries countries={countriesToDisplay} />
                    <Country countries={countriesToDisplay} />
                </div>
            )}
        </div>
    );
}

export default App;
