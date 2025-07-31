import express from 'express';
import cors from 'cors';
const app = express();

import pingRouter from './src/routes/ping';
import diagnosesRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
import { errorMiddleware } from './src/utils/errorMiddleware';

app.use(cors());
app.use(express.json());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientRouter);

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
