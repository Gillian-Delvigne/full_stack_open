export const Statistics = ({
    good,
    neutral,
    bad,
    all,
    average,
    posPercent,
}) => {
    return (
        <div>
            <h1>Statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {average}</p>
            <p>positive {posPercent} %</p>
        </div>
    );
};
