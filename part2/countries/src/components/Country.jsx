import React from "react";

export const Country = ({ countries }) => {
    return (
        <>
            {countries.length === 1 && (
                <div>
                    <h1>{countries[0].name.common}</h1>
                    <p>Capital {countries[0].capital[0]}</p>
                    <p>Area {countries[0].area}</p>
                    <h2>Languages</h2>
                    <ul>
                        {Object.values(countries[0].languages).map(
                            (language) => (
                                <li key={language}>{language}</li>
                            )
                        )}
                    </ul>
                    <div>
                        <img src={countries[0].flags.svg} alt="" />
                    </div>
                </div>
            )}
        </>
    );
};
