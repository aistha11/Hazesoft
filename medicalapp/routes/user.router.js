import { Router } from 'express';
import { body, check } from 'express-validator';

import {
  getAllUsers,
  getUserById,
  createUser,
  update,
  remove
} from '../controllers/user.controller';

import hashPassword from '../middlewares/hashPassword';

const userRouter = Router();

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the employee
 *     example: 'Hazesoft'
 *    email:
 *     type: string
 *     description: email of a user
 *     example: 'hazesoft@gmail.com'
 *    password:
 *     type: string
 *     description: password of a user
 *     example: 'Pa$5w0rd'
 */

 /**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *    - "user"
 *    summary: Get list of all user
 *    description: Get list of all user
 *    responses:
 *       200:
 *          description: Successfully get users
 *       500:
 *          description: Error while geting users
 */

userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   tags:
 *    - "user"
 *   summary: get single user
 *   description: get a single user with id passed as parameter
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the product
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 */
userRouter.get('/:id', getUserById);

/**
  * @swagger
  * /users/register:
  *  post:
  *   tags:
  *    - "user"
  *   summary: create user
  *   description: create a user
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the user
  *      schema:
  *       type: array
  *       $ref: '#/definitions/User'
  *   responses:
  *    200:
  *     description: User created succesfully
  *    500:
  *     description: failure in creating user
  */
userRouter.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
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

/**
  * @swagger
  * /users/{id}:
  *  put:
  *   tags:
  *    - "user"
  *   summary: update user
  *   description: update a user
  *   parameters:
  *    - in: path
  *      name: id
  *      schema:
  *       type: integer
  *      required: true
  *      description: id of the user
  *      example: 2
  *    - in: body
  *      name: body
  *      description: body of the user
  *      schema:
  *       type: array
  *       $ref: '#/definitions/User'
  *   responses:
  *    200:
  *     description: user updated succesfully
  *    500:
  *     description: failure in updating user
  *    400:
  *     description: Invalid user supplied
  *    404:
  *     description: user not found
  */
 userRouter.put('/:id',  update);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   tags:
 *    - "user"
 *   summary: delete user
 *   description: delete a user
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the user
 *      example: 8
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: User not found
 */
userRouter.delete('/:id', remove)

export default userRouter;

