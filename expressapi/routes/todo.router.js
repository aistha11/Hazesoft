import { Router } from 'express';

import authenticate from '../middlewares/authenticate';
import {
  getAllTodos,
  createTodo,
  getTodoByID,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/', authenticate, getAllTodos);
todoRouter.get('/:id', authenticate, getTodoByID);
todoRouter.post('/', authenticate, createTodo);
todoRouter.patch('/:id', authenticate, updateTodo);
todoRouter.delete('/:id', authenticate, deleteTodo);

export default todoRouter;
