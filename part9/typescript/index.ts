import express from 'express';

import { calculateBmi, bmiCategory } from './calculateBmi/calculateBmi';

interface BmiReport {
  weight: number;
  height: number;
  bmi: string;
}

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (request, response) => {
  // Take weight and height from query parameters
  const weight: number = Number(request.query.weight);
  const height: number = Number(request.query.height);

  if (isNaN(weight) || isNaN(height)) {
    // Response error with malformatted parameters message
    response.status(400).json({
      error: 'malformatted parameters',
    });
  } else {
    // Calculate Bmi
    const bmi: number = calculateBmi(weight, height);
    const category: string = bmiCategory(bmi);

    const report: BmiReport = {
      weight,
      height,
      bmi: category,
    };

    // Response with BMI report
    response.status(200).json(report);
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
