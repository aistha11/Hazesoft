import connection from '../createConnection';
import createError from '../utils/createError';

export const getMyCart = (req, res, next) => {
    var sql = `SELECT carts.id,carts.quantity, products.name as productName, products.price as price 
        FROM carts 
        JOIN products ON carts.id = products.id 
        WHERE userId=${req.authenticatedUserID}`;
        console.log(sql);
  connection.query(
    sql,
    (error, data) => {
      if (error) {
        next(error);
      } else {
        res.json({
          status: 'Success',
          payload: data,
        });
      }
    }
  );
};

export const create = (req, res, next) => {
    let cart = req.body;
    console.log(req.file);
  connection.query(
    `INSERT INTO carts (productId,quantity,userId) VALUES (${cart.productId},${cart.quantity}, ${req.authenticatedUserID})`,
    (error, data) => {
      if (error) {
        next(error);
      } else {
        console.log(data);
        res.status(201).send({
          status: 'Successfully added to your cart',
        });
      }
    }
  );
};

export const update = (req, res, next) => {
  let values = '';
  Object.keys(req.body).forEach((key) => {
    values += `${key} = '${req.body[key]}', `;
  });

  values = values.slice(0, values.length - 2);
  const query = `
    UPDATE carts
    SET ${values}
    WHERE id=${req.params.id}
    `;

  connection.query(query, (error, data) => {
    if (error) {
      next(error);
    } else {
      if (data.affectedRows) {
        connection.query(
          `SELECT * FROM carts WHERE id=${req.params.id}`,
          (error, data) => {
            if (error) {
              next(error);
            } else {
              res.send({
                status: 'Success',
                data,
              });
            }
          }
        );
      } else {
        next(createError(404, 'Cart Item Not Found'));
      }
    }
  });
};

export const remove = (req, res, next) => {
  connection.query(
    `DELETE FROM carts WHERE id=${req.params.id}`,
    (error, data) => {
      if (error) {
        next(error);
      } else {
        if (data.affectedRows) {
          res.send({
            status: 'Success',
            data: {
              id: req.params.id,
            },
          });
        } else {
          next(createError(404, 'Cart Item not found'));
        }
      }
    }
  );
};
