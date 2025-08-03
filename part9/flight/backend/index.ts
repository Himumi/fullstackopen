import express from 'express';
import diaryRouter from './src/routes/diaries';
import { ZodErrorHandler } from './src/middlewares/errorHandler';

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_request, response) => {
  console.log('someone pinged here');
  response.send('pong');
});

app.use('/api/diaries', diaryRouter);

// middlewares
app.use(ZodErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
