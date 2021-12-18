import connection from '../createConnection';
import createError from '../utils/createError';

export const getAllEmployees = (req, res, next) => {
    var sql = `SELECT * FROM Employee`;
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

export const getEmployeeByID = (req, res, next) => {
  connection.query(
    `SELECT * FROM Employee WHERE EmpID=${req.params.id}`,
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

export const createEmployee = (req, res, next) => {
    let emp = req.body;
  connection.query(
    `INSERT INTO Employee 
    (Name, EmpCode, Salary) 
    VALUES ('${emp.Name}', '${emp.EmpCode}', '${emp.Salary}')`,
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
            Employee: req.body.Employee,
            description: req.body.description,
            deadline: req.body.deadline,
            completed: false,
          },
        });
      }
    }
  );
};

export const updateEmployee = (req, res, next) => {
  let values = '';
  Object.keys(req.body).forEach((key) => {
    values += `${key} = '${req.body[key]}', `;
  });

  values = values.slice(0, values.length - 2);
  const query = `
    UPDATE Employee
    SET ${values}
    WHERE EmpID=${req.params.id}
    `;

  connection.query(query, (error, data) => {
    if (error) {
      next(error);
    } else {
      if (data.affectedRows) {
        connection.query(
          `SELECT * FROM Employee WHERE EmpID=${req.params.id}`,
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

export const deleteEmployee = (req, res, next) => {
  connection.query(
    `DELETE FROM Employee WHERE EmpID=${req.params.id}`,
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
