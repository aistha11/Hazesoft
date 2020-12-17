import { Router } from 'express';

import {
  getAllLists,
  create,
  getByID,
  update,
  remove,
} from '../controllers/product.controller';

const ProductRouter = Router();

/**
 * @swagger
 * /products:
 *  get:
 *    description: Get list of all products
 *    responses:
 *       '200':
 *          description: Successfully get products
 */
ProductRouter.get('/', getAllLists);
ProductRouter.get('/:id',  getByID);
ProductRouter.post('/',  create);
ProductRouter.patch('/:id',  update);
ProductRouter.delete('/:id',  remove);

export default ProductRouter;