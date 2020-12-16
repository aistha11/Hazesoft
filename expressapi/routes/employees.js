const express = require("express");
const router = express.Router();

const mysqlConnection = require('../database');

//Get all employees
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res
        .status(400)
        .json({ msg: `Error while fetching data` });
    })
});

//Get an employees
router.get('/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
        res
        .status(400)
        .json({ msg: `Error while fetching data` });
    })
});

//Delete an employees
router.delete('/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
        res
        .status(400)
        .json({ msg: `Error while deleting data` });
    })
});

//Insert an employees
router.post('/', (req, res) => {
    let emp = req.body;
    // var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    // CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                    res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            res
            .status(400)
            .json({ msg: `Error while creating` });
    });
});

//Update an employees
router.put('/', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
        res
        .status(400)
        .json({ msg: `Error while updating` });
    })
});



module.exports = router;