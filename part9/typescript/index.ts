import express from 'express';

import { calculateBmi, bmiCategory } from './calculateBmi/calculateBmi';

const app = express();

type Weight = number;
type Height = number;
type Bmi = number;
type BmiCategory = string;

interface BmiReport {
  weight: Weight;
  height: Height;
  bmi: BmiCategory;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (request, response) => {
  // Take weight and heigth from query parameters
  const weight: Weight = Number(request.query.weight);
  const height: Height = Number(request.query.height);

  if (isNaN(weight) || isNaN(height)) {
    // Response error with malformatted parameters message
    response.status(400).json({
      error: 'malformatted parameters',
    });
  } else {
    // Calculate Bmi
    const bmi: Bmi = calculateBmi(weight, height);
    const category: BmiCategory = bmiCategory(bmi);

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
