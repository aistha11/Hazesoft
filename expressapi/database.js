const mysql = require('mysql');

// DB Stuff
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'expressmysql',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mysqlConnection;