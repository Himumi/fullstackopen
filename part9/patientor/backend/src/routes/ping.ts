import { Router } from 'express';
const pingRouter = Router();

pingRouter.get('/', (_request, response) => {
  response.send('pong');
});

export default pingRouter;
