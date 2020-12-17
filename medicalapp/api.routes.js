import { Router } from 'express';


import productRouter from './routes/products.router';

const apiRouter = Router();

apiRouter.use('/products', productRouter);

export default apiRouter;
