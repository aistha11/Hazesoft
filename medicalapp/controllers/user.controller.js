import connection from '../createConnection';
import { validationResult } from 'express-validator';
import createError from '../utils/createError';
import hashPassword from '../middlewares/hashPassword';
import { createToken } from '../utils/jwt';

export const getAllUsers = (req, res, next) => {
  connection.query('SELECT * FROM users', (error, data) => {
    if (error) {
      next(error);
    } else {
      const passwordExcludedData = data.map((user) => {
        delete user.password;
        return user;
      });

      res.json({
        status: 'Success',
        data: passwordExcludedData,
      });
    }
  });
};

export const getUserById = (req, res, next) => {
  connection.query(
    `SELECT * FROM users where id=${req.params.id}`,
    (error, data) => {
      if (error) {
        next(error);
      } else {
        const passwordExcludedData = data.map((user) => {
          delete user.password;
          return user;
        });

        res.json({
          status: 'Success',
          data: passwordExcludedData[0],
        });
      }
    }
  );
};

export const createUser = (req, res, next) => {
  const errors = validationResult(req);
  const { name, email } = req.body;
  const hashedPassword = req.hashedPassword;

  let errorMessage = '';
  errors.array().forEach((error) => {
    errorMessage += `${error.msg}. `;
  });

  if (!errors.isEmpty()) {
    next(createError(400, errorMessage.trim()));
  } else {
    connection.query(
      `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashedPassword}")`,
      (error, results) => {
        if (error) {
          if (error.code === 'ER_DUP_ENTRY') {
            next(createError(400, 'Email already exists'));
          } else {
            next(error);
          }
        } else {
          const token = createToken({ id: results.insertId });
          res.status(201).json({
            status: 'Success',
            token,
            data: {
              id: results.insertId,
              name,
              email,
            },
          });
        }
      }
    );
  }
};

export const update = (req, res, next) => {
  let values = '';
  Object.keys(req.body).forEach((key) => {
    values += `${key} = '${req.body[key]}', `;
  });

  values = values.slice(0, values.length - 2);
  const query = `
    UPDATE users
    SET ${values}
    WHERE id=${req.params.id}
    `;

  connection.query(query, (error, data) => {
    if (error) {
      next(error);
    } else {
      if (data.affectedRows) {
        connection.query(
          `SELECT * FROM users WHERE id=${req.params.id}`,
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
        next(createError(404, 'User Not Found'));
      }
    }
  });
};

export const remove = (req, res, next) => {
  connection.query(
    `DELETE FROM users WHERE id=${req.params.id}`,
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
          next(createError(404, 'User not found'));
        }
      }
    }
  );
};
