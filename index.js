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
        password: "password",
        database: "employees_db"
    },
    console.log(`Connected to the employees_db database.`)
);

db.connect();

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
                "Update Employee Role",
                "Update Employee Manager",
                "Delete Employee",
                "View all Roles",
                "Add Role",
                "Delete Role",
                "View all Departments",
                "Add Department",
                "Delete Department",
                "Exit Program"
            ]
        }
    ])
    .then (response => {
        switch (response.action) {
            case "View all Employees":
                viewEmployees();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "View all Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Delete Role":
                deleteRole();
                break;
            case "View all Departments":
                viewDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Exit Program":
                // called when b/c application is stopping, end of possible queries sent to MySQL
                connection.end();
                console.log("Goodbye.");
                break;
        }
    })
}

// EMPLOYEES functions

// show manager name////////////////////////////
// Generate table with employee ids,  names, job titles, departments, salaries, and any managers 
function viewEmployees() {
    // Testing - function execution
    // console.log("View all Employees")
    //sql query to render employees table data
    const employees = 'SELECT e.id as ID, CONCAT(e.first_name," ",e.last_name) as Name, r.title as Title, d.name as Department, r.salary as Salary FROM employees as e JOIN roles as r on e.role_id = r.id JOIN departments as d on r.department_id = d.id'
    db.query(employees, (err,res) => {
        if(err) throw err; 
        console.table(res);
        mainMenu();
    })
}

//Empty array to store all roles as objects
var rolesList = [];

function listRoles() {
    db.query("SELECT id, title FROM roles", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            rolesList.push(res[i].title);
        }
    })
    return rolesList;
}

// //Empty array to store all departments as objects
// var departmentsList = [];

// function listDepartments() {
//     db.query("SELECT id, name FROM departments", function(err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//             departmentsList.push(res[i].name);
//         }
//     })
//     return departmentsList;
// }

//Empty array to store all employees as objects
var employeesList = [];

function listEmployees() {
    db.query('SELECT id, CONCAT(first_name," ",last_name) as name FROM employees', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            employeesList.push(res[i].name);
        }
    })
    return employeesList;
}

//done
// Function to create a new record in the employees table
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
            choices: listRoles()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is their manager?",
            choices: listEmployees()
        }
    ])
    .then(function(answer) {
        var roleId = listRoles().indexOf(answer.role) + 1
        var managerId = listEmployees().indexOf(answer.manager) + 1
        const employee = {
            first_name: answer.firstname,
            last_name: answer.lastname,
            manager_id: managerId,
            role_id: roleId,
        }
        db.query('INSERT INTO employees SET ? ', employee, (err) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Employee added sucessfully");
        mainMenu();
    })
}

// Function to delete record in the employees table
function deleteEmployee() {
    console.log("Delete Employee");
    inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee would you like to delete?",
            choices: listEmployees()
        }
    ])
    .then(response => {
        db.query('DELETE * FROM employees WHERE id = ?', response.employee, (err, results) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Employee deleted sucessfully");
        mainMenu();
    })    
}

//done
// Function to change the role_id of an existing record in employees
function updateEmployeeRole() {
    console.log("Update Employee role");
    inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: listEmployees()
        },
        {
            type: "list",
            name: "role",
            message: "Which role do you want to assign to the selected employee?",
            choices: listRoles()
        }
    ])
    .then(function(answer) {
        var roleId = listRoles().indexOf(answer.role) + 1
        var employeeId = listEmployees().indexOf(answer.employee) + 1
        //sql query to identify employee, then edit value of role_id
        db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId], (err) => {
            if(err) throw err;
        })
    })
    .then(response => {
        console.log("Employee role updated successfully");
        mainMenu();
    })
}

// Funtion to update the manager_id of any employees table record
function updateEmployeeManager() {
    console.log("Update Employee manager");
    // Create an array of employees to be used in the prompt to select which employee to edit
    return inquirer
    .prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's do you want to update?",
            choices: employeesList()
        },
        {
            type: "list",
            name: "manager",
            message:"Which manager should be assigned to the selected employee?",
            choices: employeesList()
        }
    ])
    .then(answer => {
        db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [response.manager, response.employee], (err, results) => {
            if(err) throw err; 
        })
    })
    .then(function(answer) {
        var roleId = listRoles().indexOf(answer.role) + 1
        var managerId = listEmployees().indexOf(answer.manager) + 1
        const employee = {
            first_name: answer.firstname,
            last_name: answer.lastname,
            manager_id: managerId,
            role_id: roleId,
        }
        db.query('INSERT INTO employees SET ? ', employee, (err) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Employee's Manager updated successfully")
        mainMenu();
    })
}

// ROLES Functions

// done
// Generate table with all job titles, ids, salaraies, and corresponding departments 
function viewRoles() {
    // Testing - function execution
    // console.log("View all Roles");
    const roles = 'SELECT r.id as ID, r.title as Title, d.name as Department, r.salary as Salary FROM roles as r JOIN departments as d ON r.department_id = d.id'
    db.query(roles, (err,res) => {
        if(err) throw err; 
        console.table(res);
        mainMenu();
    })
}

//done
// Function for user to add a role by writing a record to the roles table and relating to a department (departments.id)
function addRole() {
    // Testing - function execution
    console.log("Add Role");
    db.promise().query("SELECT * FROM departments")
        .then(res => {
            // result is an array of arrays of departments table record data, column definitios 
            // console.log(res);
            // map the the values of the 1st object (table record data array) into a new set of values expected by inquirer.prompt later
            return res[0].map(department => {
                return {
                    name: department.name,
                    value: department.id
                }
            })
        })
        // User the new departmentList array for the choices in Department selection question
        .then((departmentList) => {
            // Return the results of the prompts so following then can access
            return inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
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
                    choices: departmentList
                }
            ])
        })
        // Answer is inquirer-specific syntax for using data provided by user in response to prompts
        .then(answer => {
            // create object with parameters necessary for a record in roles table
            const role = {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }
            // Create a record in roles. SET indicates both the columns and corresponding values will be provided in the role object
            db.query('INSERT INTO roles SET ?', role, (err) => {
                if(err) throw err; 
            })
        })
        .then(res => {
            console.log("Role added to the database");
            mainMenu();
        })
        .catch(err => {throw err})
}

// Function to delete record in the roles table
function deleteRole() {
    console.log("Delete Role");
    db.promise().query("SELECT * FROM roles")
        .then(res => {
            // result is an array of arrays of roles table record data, column definitios 
            // console.log(res);
            // map the the values of the 1st object (table record data array) into a new set of values expected by inquirer.prompt later
            return res[0].map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
        })
        // User the new departmentList array for the choices in Department selection question
        .then((rolesList) => {
            return inquirer
            .prompt([
                {
                    type: "list",
                    name: "role",
                    message: "Which department would you like to delete?",
                    choices: rolesList
                }
            ])
        })
        .then(answer => {
            db.query('DELETE * FROM roles WHERE id = ?', answer.role, (err) => {
                if(err) throw err; 
            })
        })
        .then(res => {
            console.log("Role deleted sucessfully");
            mainMenu();
        })
        .catch(err => {throw err})
}

// DEPARTMENTS functions

//done
// Generate table showing department names and ids
function viewDepartments() {
    // Testing - function execution
    // console.log("View all Departments");
    db.query('SELECT id as ID, name as Department FROM departments', (err,res) => {
        if(err) throw err; 
        console.table(res);
        mainMenu();
    })
}

//done
// Function for user to add a department by writing a record to the departments table
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
        console.log(typeof(response.department_name));
        //sql query to add response to the department table
        const department = response.department_name
        db.query('INSERT INTO departments (name) VALUES (?)', department, (err, res) => {
            if(err) throw err; 
            console.log("Added " + response.department_name + " to the database");
            mainMenu();
        })
    })
}

// Function to delete record in the departments table
function deleteDepartment() {
    console.log("Delete Department");
    inquirer
    .prompt([
        {
            type: "list",
            name: "department",
            message: "Which department would you like to delete?",
            choices: departmentsList()
        }
    ])
    .then(response => {
        db.query('DELETE * FROM departments WHERE id = ?', response.department, (err, results) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Department deleted sucessfully");
        mainMenu();
    })    
}

// Start app logic at main menu
mainMenu();