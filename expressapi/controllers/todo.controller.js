import connection from '../createConnection';
import createError from '../utils/createError';

export const getAllTodos = (req, res, next) => {
  connection.query(
    `SELECT * FROM todos WHERE user_id=${req.authenticatedUserID}`,
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

export const getTodoByID = (req, res, next) => {
  connection.query(
    `SELECT * FROM todos WHERE id=${req.params.id}`,
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

export const createTodo = (req, res, next) => {
  connection.query(
    `INSERT INTO todos 
    (user_id, todo, description, deadline) 
    VALUES ('${req.authenticatedUserID}', '${req.body.todo}', '${req.body.description}', '${req.body.deadline}')`,
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
            todo: req.body.todo,
            description: req.body.description,
            deadline: req.body.deadline,
            completed: false,
          },
        });
      }
    }
  );
};

export const updateTodo = (req, res, next) => {
  let values = '';
  Object.keys(req.body).forEach((key) => {
    values += `${key} = '${req.body[key]}', `;
  });

  values = values.slice(0, values.length - 2);
  const query = `
    UPDATE todos
    SET ${values}
    WHERE user_id=${req.authenticatedUserID} AND id=${req.params.id} 
    `;

  connection.query(query, (error, data) => {
    if (error) {
      next(error);
    } else {
      if (data.affectedRows) {
        connection.query(
          `SELECT * FROM todos WHERE id=${req.params.id}`,
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

export const deleteTodo = (req, res, next) => {
  connection.query(
    `DELETE FROM todos WHERE id=${req.params.id} AND user_id=${req.authenticatedUserID}`,
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
