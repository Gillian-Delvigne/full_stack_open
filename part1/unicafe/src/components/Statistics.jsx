import { StatisticLine } from "./StatisticLine";

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
			<StatisticLine text="good" value={good}/>
			<StatisticLine text="neutral" value={neutral}/>
			<StatisticLine text="bad" value={bad}/>
			<StatisticLine text="all" value={all}/>
			<StatisticLine text="average" value={average}/>
			<StatisticLine text="positive" suffix="%" value={posPercent}/>
        </div>
    );
};
