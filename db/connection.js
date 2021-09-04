// import MySQL
const mysql = require('mysql2');
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '&takamat$u0v3rall6877&',
        database: 'employee_tracker'
    },
    console.log('Connected to the emp_tracker database.')
);

module.exports = db;