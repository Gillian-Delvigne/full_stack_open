
export const Country = ({ countries, country }) => {
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
                        {Object.values(target.languages).map(
                            (language) => (
                                <li key={language}>{language}</li>
                            )
                        )}
                    </ul>
                    <div>
                        <img src={target.flags.svg} alt="" />
                    </div>
                </div>
            )}
        </>
    );
};
