import { Router } from 'express';

import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import todoRouter from './routes/todo.router';

import employeeRouter from './routes/employees.router';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/todos', todoRouter);
apiRouter.use('/employees', employeeRouter);

export default apiRouter;
