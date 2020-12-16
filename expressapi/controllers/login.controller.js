import { compare } from 'bcrypt';
import connection from '../createConnection';
import deletePasswordFromResponse from '../utils/deletePassword';
import { createToken } from '../utils/jwt';
import createError from '../utils/createError';

export default function login(req, res, next) {
  connection.query(
    `SELECT * FROM users WHERE email='${req.body.email}'`,
    (error, records) => {
      if (error) {
        next(error);
      } else {
        if (!records.length) {
          next(createError(400, 'Email or password do not match'));
        } else {
          compare(req.body.password, records[0].password).then(function (
            result
          ) {
            if (result) {
              res.json({
                status: 'Success',
                token: createToken({ id: records[0].id }),
                data: deletePasswordFromResponse(records)[0],
              });
            } else {
              next(createError(400, 'Email or password do not match'));
            }
          });
        }
      }
    }
  );
}
