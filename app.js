const [viewAllDept, viewAllRoles, viewAllEmp, addDept, addRole, addEmp, updateEmp]= require('./query');
const inquirer = require('inquirer');

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


// select different choices from menu
function menuChoices() {
    inquirer
        .prompt(menu)
        .then( ({select_choice}) => {
            switch(select_choice) {
                case 'View All Departments':
                    viewAllDept();
                    menuChoices();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    menuChoices();
                    break;
                case 'View All Employees':
                    console.log('View All Employees');
                    viewAllEmp();
                    menuChoices();
                    break;
                case 'Add A Department':
                    inqDepAdd();
                    menuChoices();
                    break;
                case 'Add A Role':
                    console.log('Add A Role');
                    break;
                case 'Add An Employee':
                    console.log('Add An Employee');
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


menuChoices();
