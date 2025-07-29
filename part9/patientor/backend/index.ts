import express from 'express';
const app = express();

import pingRouter from './controllers/ping';

app.use(express.json());

app.use('/api/ping', pingRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
