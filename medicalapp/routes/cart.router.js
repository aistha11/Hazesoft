import { Router } from 'express';

import authenticate from '../middlewares/authenticate';

import {
  getMyCart,
  create,
  update,
  remove,
} from '../controllers/cart.controller';


const CartRouter = Router();

/**
 * @swagger
 * definitions:
 *  Cart:
 *   type: object
 *   properties:
 *    productId:
 *     type: int
 *     description: id of a cart
 *     example: 2
 *    quantity:
 *     type: string
 *     description: amount of a cart
 *     example: 4
 *   security:
 *     - medical_auth:
 *       - "write:carts"
 *       - "read:carts"
 */

/**
 * @swagger
 * /carts/{id}:
 *  get:
 *    tags:
 *    - "cart"
 *    summary: Get list of all carts
 *    description: Get list of all carts
 *    responses:
 *       200:
 *          description: Successfully get carts
 */
CartRouter.get('/', authenticate, getMyCart);


/**
  * @swagger
  * /carts:
  *  post:
  *   tags:
  *    - "cart"
  *   summary: create cart
  *   description: create a cart
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the cart
  *      schema:
  *       type: array
  *       $ref: '#/definitions/Cart'
  *   responses:
  *    200:
  *     description: cart created succesfully
  *    500:
  *     description: failure in creating cart
  */
CartRouter.post('/',authenticate, create);

/**
  * @swagger
  * /carts/{id}:
  *  put:
  *   tags:
  *    - "cart"
  *   summary: update cart
  *   description: update a cart
  *   parameters:
  *    - in: path
  *      name: id
  *      schema:
  *       type: integer
  *      required: true
  *      description: id of the cart
  *      example: 2
  *    - in: body
  *      name: body
  *      description: body of the cart
  *      schema:
  *       type: array
  *       $ref: '#/definitions/Cart'
  *   responses:
  *    200:
  *     description: cart updated succesfully
  *    500:
  *     description: failure in updating cart
  *    400:
  *     description: Invalid cart supplied
  *    404:
  *     description: cart not found
  */
CartRouter.put('/:id',authenticate,  update);

/**
 * @swagger
 * /carts/{id}:
 *  delete:
 *   tags:
 *    - "cart"
 *   summary: delete cart
 *   description: delete a cart
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the cart
 *      example: 8
 *   responses:
 *    200:
 *     description: success
 */
CartRouter.delete('/:id',authenticate,  remove);

export default CartRouter;