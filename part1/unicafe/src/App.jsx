import { useState } from 'react';

const StatisticLine = (props) => {
  return <p>{`${props.text} ${props.value}`}</p>
};

const Statistics = (props) => {
  if (!props.good && !props.neutral && !props.bad) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positive} />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => setGood(good + 1);
  const handleNeutralButton = () => setNeutral(neutral + 1);
  const handleBadButton = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = good / all * 100 || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodButton} />
      <Button text="neutral" onClick={handleNeutralButton} />
      <Button text="bad" onClick={handleBadButton} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
