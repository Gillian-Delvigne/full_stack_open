import React from "react";

export const Countries = ({ countries }) => {
    const numberOfCountries = countries.length;

    return (
        <>
            {numberOfCountries > 10 &&
                "Too many matches, specify another filter"}
            {numberOfCountries <= 10 && numberOfCountries > 1 && (
                <div>
                    {countries.map((country) => {
                        return (
                            <li key={country.cca2}>{country.name.common}</li>
                        );
                    })}
                </div>
            )}
        </>
    );
};
