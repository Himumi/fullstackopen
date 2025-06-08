import { useState } from 'react';

const Statistics = (props) => {
  return (
    <div>
      <h1>statictics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {props.average}</p>
      <p>positive {props.positive}%</p>
    </div>
  );
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
      <button onClick={handleGoodButton}>good</button>
      <button onClick={handleNeutralButton}>neutral</button>
      <button onClick={handleBadButton}>bad</button>
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
