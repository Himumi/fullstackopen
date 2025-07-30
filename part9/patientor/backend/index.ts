import express from 'express';
import cors from 'cors';
const app = express();

import pingRouter from './src/routes/ping';

app.use(cors());
app.use(express.json());

app.use('/api/ping', pingRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
