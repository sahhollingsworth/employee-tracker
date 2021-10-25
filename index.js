// Call the Inquirer module for CLI user input UI
var inquirer = require("inquirer");
// Call the MySQL2 client
const mysql = require("mysql2");
// Call console.table method for printing tables to CLI
const cTable = require("console.table");

const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "root",
      database: "employees_db"
    },
    console.log(`Connected to the employees_db database.`)
);

function mainMenu () {
    inquirer
    .prompt ([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "Add Employee",
                "View all Roles",
                "Add Role",
                "View all Departments",
                "Add Department",
                "Exit Program"
            ]
        }
    ])
    .then (response => {
        switch (response.choice) {
            case "View all Employees":
                viewEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View all Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Exit Program":
                // called when b/c application is stopping, end of possible queries sent to MySQL
                connection.end();
                console.log("Goodbye.");
                break;
        }
    })
}

//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
    console.log("View all Employees")
    //sql query to render employees table data
}


//I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    console.log("Add Employee");
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstname",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastname",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is their role? ",
            choices: [] //pull in roles? Has to be live list from table
        },
        {
            type: "list",
            name: "manager",
            message: "Whats their managers name?",
            choices: [] //pull in manager? Has to be live list from table
        }
    ])
    .then([
        console.log("Employee added successfully")
        //sql query to add new record to db, approrpiately matching prompt.response values to employee columns
    ])
}

//THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployee() {
    console.log("Update Employee role");
    inquirer
    .prompt([
        {
            type: "list",
            name: "employees",
            message: "Which employee's role do you want to update?",
            choices: [] //pull in employees? Has to be live list from table
        },
        {
            type: "list",
            name: "roles",
            message: "Which role do you want to assign to the selected employee?",
            choices: [] //pull in roles? Has to be live list from table
        }
    ])
    .then([
        console.log("Employee role updated successfully")
        //sql query to identify employee, then edit value of role_id

    ])
}

// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
    console.log("View all Roles");
    //sql query to render roles table data
}

//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    console.log("Add Role");
    inquirer
    .prompt([
        {
            type: "input",
            name: "nameRole",
            message: "What is the name of the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department",
            message: "Which department does the role belong to?",
            choices: [] //pull in departments? Has to be live list from table
        }

    ])
    .then(response => {
        console.log(response + "has been added as a Role.")
        //sql query to add response as to the Row table
    })
}

//THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
    console.log("View all Departments");
    //sql query to render departments table data
}

//THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
    console.log("Add Department");
    inquirer
    .prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        }
    ])
    .then(response => {
        console.log(response + "has been added as a Department.")
        //sql query to add response to the department table
    })
}

// Start app logic at main menu
mainMenu();