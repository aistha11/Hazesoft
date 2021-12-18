import { Router } from 'express';

import {
  getAllLists,
  create,
  getByID,
  update,
  remove,
} from '../controllers/product.controller';

import multer from 'multer';

// const upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
 
var upload = multer({ storage: storage })

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   // limits: {
//   //   fileSize: 1024 * 1024 * 5
//   // },
//   // fileFilter: fileFilter
// });

const ProductRouter = Router();

/**
 * @swagger
 * definitions:
 *  Product:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the employee
 *     example: 'Flexon'
 *    disease:
 *     type: string
 *     description: disease type
 *     example: 'Fever'
 *    manufacturer:
 *     type: string
 *     description: name of the manufacturer
 *     example: 'SK Prod'
 *    SKU:
 *     type: string
 *     description: stock keeping unit
 *     example: 'dle78sd'
 *    price:
 *     type: int
 *     description: price of the product
 *     example: 290
 *    description:
 *     type: string
 *     description: short description of the products
 *     example: 'This medicine is used for fever.'
 *    mfd:
 *     type: datetime
 *     description: date of manufacture
 *     example: 2020-10-11
 *    exp:
 *     type: datetime
 *     description: date of expiration
 *     example: 2021-10-11
 *    updatedAt:
 *     type: datetime
 *     description: date of product update
 *     example: 2021-5-11
 */

/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *    - "product"
 *    summary: Get list of all products
 *    description: Get list of all products
 *    responses:
 *       200:
 *          description: Successfully get products
 *       500:
 *          description: Error while geting products
 */
ProductRouter.get('/', getAllLists);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *   tags:
 *    - "product"
 *   summary: get single product
 *   description: get a single product with id passed as parameter
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
ProductRouter.get('/:id',  getByID);

/**
  * @swagger
  * /products:
  *  post:
  *   tags:
  *    - "product"
  *   summary: create product
  *   description: create a product
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the product
  *      schema:
  *       type: array
  *       $ref: '#/definitions/Product'
  *   responses:
  *    200:
  *     description: Product created succesfully
  *    500:
  *     description: failure in creating product
  */
ProductRouter.post('/',upload.single('productImage'),  create);

/**
  * @swagger
  * /products/{id}:
  *  put:
  *   tags:
  *    - "product"
  *   summary: update product
  *   description: update a product
  *   parameters:
  *    - in: path
  *      name: id
  *      schema:
  *       type: integer
  *      required: true
  *      description: id of the product
  *      example: 2
  *    - in: body
  *      name: body
  *      description: body of the product
  *      schema:
  *       type: array
  *   responses:
  *    200:
  *     description: Product updated succesfully
  *    500:
  *     description: failure in updating product
  *    400:
  *     description: Invalid product supplied
  *    404:
  *     description: Product not found
  */
ProductRouter.put('/:id',  update);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *   tags:
 *    - "product"
 *   summary: delete product
 *   description: delete a product
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the product
 *      example: 8
 *   responses:
 *    200:
 *     description: success
 */
ProductRouter.delete('/:id',  remove);

export default ProductRouter;