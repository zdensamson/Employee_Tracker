const db = require('./db/connection');
const cTable = require('console.table');

//IMPORT TO MAKE WORK START-----------------------------------------------------------
const inquirer = require('inquirer');
const { removeAllListeners, rollback } = require('./db/connection');

const menu = [
    {
        type: 'list',
        name: 'select_choice',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update Employee Role']
    }
];

const depAddQuestion = [
    {
        type: 'text',
        name: 'depName',
        message: 'What is the name of the new department?'
    }
];

const roleAddQuestions = [
    {
        type: 'text',
        name: 'title',
        message: 'What is the name of the new role?'
    },
    {
        type: 'text',
        name: 'salary',
        message: 'What is the salary of the new role?'
    },
    {
        type: 'list',
        message: 'What department is this role in?',
        name: 'departments',
        choices: ['yo']
    }
];

const empAddQuestions = [
    {
        type: 'text',
        name: 'first_name',
        message: 'What is the first name of the new employee?'
    },
    {
        type: 'text',
        name: 'last_name',
        message: 'What is the last name of the new employee?'
    },
    {
        type: 'list',
        message: 'What role does this employee have?',
        name: 'roles',
        choices: ['yo']
    },
    {
        type: 'list',
        message: 'Who does this employee report to?',
        name: 'managers',
        choices: []
    }
];

// select different choices from menu
function menuChoices() {
    inquirer
        .prompt(menu)
        .then( ({select_choice}) => {
            switch(select_choice) {
                case 'View All Departments':
                    viewAllDept();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    console.log('View All Employees');
                    viewAllEmp();
                    break;
                case 'Add A Department':
                    inqDepAdd();
                    break;
                case 'Add A Role':
                    gatherDeptForRole();
                    break;
                case 'Add An Employee':
                    gatherRoleForEmp();
                    break;
                case 'Update Employee Role':
                    console.log('Update Employee Role');
            }
        })
};

// add DEPARTMENT inquirer
function inqDepAdd() {
    inquirer
        .prompt(depAddQuestion)
        .then( ({depName}) => {
            addDept(depName)
        })
}

// add ROLE inquirer
function inqRoleAdd(depts) {
    roleAddQuestions[2].choices = [];

    depts.forEach(dept => {
        roleAddQuestions[2].choices.push(dept.name.concat("_").concat(dept.id))
    });
    
    inquirer
        .prompt(roleAddQuestions)
        .then(({ title, salary, departments }) => {
            addRole(title, salary, departments);
        });
}

// add EMP inquirer
function inqEmpAdd(emps, roles) {
    empAddQuestions[2].choices = [];
    empAddQuestions[3].choices = [];

    emps.forEach(emp => {
        empAddQuestions[3].choices.push(emp.first_name.concat("_").concat(emp.last_name).concat("_").concat(emp.id));
    });
    roles.forEach(role => {
        empAddQuestions[2].choices.push(role.title.concat("_").concat(role.id))
    });
    
    inquirer
    .prompt(empAddQuestions)
    .then(({ first_name, last_name, roles, managers }) => {
        addEmp(first_name, last_name, roles, managers);
    });
}

//---------------------------------------------------------------------------------------------------------------------------------------------------//


// READ queries
function viewAllDept() {
    const sql = `SELECT * FROM department`;
    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.log('----------')
        console.table(rows);
        menuChoices();
    });
};

function viewAllRoles() {
    const sql = `SELECT role.title, role.id AS role_id, department.name AS department_name, role.salary
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id
                 `;

    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.log('----------');
        console.table(rows);
        menuChoices();
    })
};

function viewAllEmp() {
    const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, employee.manager_id
                 FROM employee
                 LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 `;

    db.promise().query(sql)
    .then( ([rows,fields]) => {
        console.log('----------')
        console.table(rows);
        menuChoices();
    })
};

// CREATE queries
function addDept(depName) {
    const sql = `INSERT INTO department (name) VALUES (?)`
    const params = [depName];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        menuChoices();
    });
}

function addRole(title, salary, departments) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`
    const params = [title, salary, departments.charAt(departments.length-1)];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        menuChoices();
    })
}

function addEmp(first_name, last_name, roles, managers) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
    const params = [first_name, last_name, roles.charAt(roles.length-1), managers.charAt(managers.length-1)];

    db.promise().query(sql, params)
    .then( ([rows,fields]) => {
        menuChoices();
    })
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

// READ department names for ADD ROLE
function gatherDeptForRole() {
    const sql = `SELECT department.name, department.id FROM department`;
    
    db.promise().query(sql)
    .then( ([rows,fields]) => {
        inqRoleAdd(rows);
    })
}

// READ department names for ADD EMPLOYEE
function gatherRoleForEmp() {
    const sql = `SELECT role.title, role.id FROM role`;
    
    db.promise().query(sql)
    .then( ([rows,fields]) => {
        gahterEmpForEmp(rows);
    })
}

// READ employee names for ADD EMPLOYEE
function gahterEmpForEmp(roles) {
    const sql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`;
    
    db.promise().query(sql)
    .then( ([rows,fields]) => {
        inqEmpAdd(rows, roles);
    })    
}

menuChoices();

module.exports = [viewAllDept, viewAllRoles, viewAllEmp, addDept, addRole, addEmp, updateEmp];