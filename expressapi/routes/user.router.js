import { Router } from 'express';
import { body, check } from 'express-validator';

import {
  getAllUsers,
  getUserById,
  createUser,
} from '../controllers/user.controller';

import hashPassword from '../middlewares/hashPassword';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage(
        'Password must contain a number, a special character, an uppercase and a lowercase character'
      ),
  ],
  hashPassword,
  createUser
);

export default userRouter;
