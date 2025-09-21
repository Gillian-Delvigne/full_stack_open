export const Country = ({ countries, country, weather }) => {
    const target = country ? country : countries[0];

    return (
        <>
            {(countries.length === 1 || country) && (
                <div>
                    <h1>{target.name.common}</h1>
                    <p>Capital {target.capital[0]}</p>
                    <p>Area {target.area}</p>
                    <h2>Languages</h2>
                    <ul>
                        {Object.values(target.languages).map((language) => (
                            <li key={language}>{language}</li>
                        ))}
                    </ul>
                    <div>
                        <img
                            style={{ width: "200px" }}
                            src={target.flags.svg}
                            alt=""
                        />
                    </div>
                    { weather &&
                        <div>
                            <h2>Weather in {target.capital[0]}</h2>
                            <p>Temperature {weather.current.temp}° Celsius</p>
							<img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="" />
							<p>Wind {weather.current.wind_speed} m/s</p>
                        </div>
                    }
                </div>
            )}
        </>
    );
};
