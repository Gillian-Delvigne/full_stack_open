import { useState } from "react";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { Display } from "./components/Display";

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <Header title="give feedback" />
            <Button text="good" onClick={() => setGood(good + 1)} />
            <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" onClick={() => setBad(bad + 1)} />
            <Display good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;
