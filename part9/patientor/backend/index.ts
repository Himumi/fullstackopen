import express from 'express';
import cors from 'cors';
const app = express();

import pingRouter from './src/routes/ping';
import diagnosesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';

app.use(cors());
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
