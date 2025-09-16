import { useState } from "react";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;
    const average = all === 0 ? 0 : (good - bad) / all;
    const posPercent = all === 0 ? 0 : (good / all) * 100;

    return (
        <div>
            <Header title="give feedback" />
            <Button text="good" onClick={() => setGood(good + 1)} />
            <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" onClick={() => setBad(bad + 1)} />
             <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                posPercent={posPercent}
            />
        </div>
    );
}

export default App;
