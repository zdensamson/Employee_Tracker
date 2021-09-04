const db = require('./db/connection');
const cTable = require('console.table');

// READ queries
function viewAllDept() {
    const sql = `SELECT * FROM department`;
    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());
};

function viewAllRoles() {
    const sql = `SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id
                 `;

    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());
};

function viewAllEmp() {
    const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, employee.manager_id
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 `;

    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());
};

// CREATE queries
function addDept() {
    const sql = `INSERT INTO department (name) VALUES (?)`
    const params = ["HR"];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());    
}

function addRole() {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
    const params = ["QA Engineer", "50000", "1"];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());    
}

function addEmp() {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
    const params = ["Bill", "Nye", "1", "2"];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());    
}

// UPDATE query
function updateEmp() {
    const sql = `UPDATE employee SET role_id = ?
                 WHERE id = ?`
    const params = ["4", "7"];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        console.table(rows);
    })
    .catch(console.log)
    // cancels db connection
    .then( () => db.end());    
}