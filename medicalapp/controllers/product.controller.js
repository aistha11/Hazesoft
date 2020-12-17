import connection from '../createConnection';
import createError from '../utils/createError';

export const getAllLists = (req, res, next) => {
    var sql = `SELECT * FROM Products`;
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

export const getByID = (req, res, next) => {
  connection.query(
    `SELECT * FROM Products WHERE id=${req.params.id}`,
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
    let prod = req.body;
  connection.query(
    `INSERT INTO Products 
    (name,disease,manufacturer,SKU,description,mfd,exp,updatedAt) 
    VALUES ('${prod.name}', '${prod.disease}', '${prod.manufacturer}','${prod.SKU}','${prod.description}',
        '${prod.mfd}','${prod.exp}','${prod.updatedAt}')`,
    (error, data) => {
      if (error) {
        next(error);
      } else {
        console.log(data);
        res.status(201).send({
          status: 'Success',
          payload: {
            id: data.insertId,
            user_id: req.authenticatedUserID,
            Product: req.body.Product,
            description: req.body.description,
            deadline: req.body.deadline,
            completed: false,
          },
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
    UPDATE Products
    SET ${values}
    WHERE id=${req.params.id}
    `;

  connection.query(query, (error, data) => {
    if (error) {
      next(error);
    } else {
      if (data.affectedRows) {
        connection.query(
          `SELECT * FROM Products WHERE id=${req.params.id}`,
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
        next(createError(404, 'Item Not Found'));
      }
    }
  });
};

export const remove = (req, res, next) => {
  connection.query(
    `DELETE FROM Products WHERE id=${req.params.id}`,
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
          next(createError(404, 'Item not found'));
        }
      }
    }
  );
};
