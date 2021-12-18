import { Router } from 'express';

import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';

import productRouter from './routes/products.router';

import cartRouter from './routes/cart.router';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

apiRouter.use('/products', productRouter);

apiRouter.use('/carts', cartRouter);



export default apiRouter;
