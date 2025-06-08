import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => setGood(good + 1);
  const handleNeutralButton = () => setNeutral(neutral + 1);
  const handleBadButton = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const avarage = (good - bad) / all || 0;
  const positive = good / all * 100 || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodButton}>good</button>
      <button onClick={handleNeutralButton}>neutral</button>
      <button onClick={handleBadButton}>bad</button>
      <h1>statictics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>avarage {avarage}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

export default App;
