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
    const employees = 'SELECT e.id as ID, CONCAT(e.first_name,"  ",e.last_name) as Name, r.title as Title, d.name as Department, r.salary as Salary FROM employees as e JOIN roles as r on e.role_id = r.id JOIN departments as d on r.department_id = d.id'
    db.query(employees, (err,res) => {
        if(err) throw err; 
        console.table(res);
        mainMenu();
    })
}

// Function to return all employees as an array
function employeesList() {
    return db.query('SELECT e.id, CONCAT(e.first_name," ",e.last_name) as name, e.role_id FROM employees as e', (err,res) => {
        if(err) throw err;
    })
    .then(response => {
        return response[0].map(employee => {
            return {
                name: e.name,
                value: e.id
            }
        })
    }) 
}

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
            choices: rolesList()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is their manager?",
            choices: employeesList()
        }
    ])
    .then(response => {
        console.log(response.role);
        console.log(response.manager);
        db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?)', [response.firstname, response.lastname, response.role, response.manager], (err, results) => {
            if(err) throw err; 
            console.log("Employee added sucessfully");
            mainMenu();
        })
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
            choices: employeesList()
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

// Function to change the role_id of an existing record in employees
function updateEmployeeRole() {
    console.log("Update Employee role");
    // Create an array of employees to be used in the prompt to select which employee to edit
        return inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                choices: employeesList()
            },
            {
                type: "list",
                name: "role",
                message: "Which role do you want to assign to the selected employee?",
                choices: rolesList()
            }
        ])
        .then(response => {
            console.log("Employee role updated successfully")
            //sql query to identify employee, then edit value of role_id
            db.query('UPDATE employees SET role_id = ? WHERE id = ?', [response.role, response.employee], (err, results) => {
                if(err) throw err; 
                console.log("Employee role updated sucessfully");
                mainMenu();
        })
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
    .then(response => {
        db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [response.manager, response.employee], (err, results) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Employee's Manager updated successfully")
        mainMenu();
    })
}

// ROLES Functions

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

// Function to return all roles as an array
function rolesList() {
    return db.query("SELECT * FROM roles as r", (err,res) => {
        if(err) throw err;
    }) 
    .then(res => {
        return res[0].map(role => {
            return {
                name: r.title,
                value: r.id
            }
        })
    })      
}

// Function for user to add a role by writing a record to the roles table and relating to a department (departments.id)
function addRole() {
    // Testing - function execution
    // console.log("Add Role");
    inquirer
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
            choices: departmentsList()
        }
    ])
    .then(response => {
        const role = {
            title: response.title,
            salary: response.salary,
            department_id: response.department
        }
        db.query('INSERT INTO roles SET ?', role, (err, res) => {
            if(err) throw err; 
            console.log("Added " + response.title + " to the database");
            mainMenu();
        })
    })       
}

// Function to delete record in the roles table
function deleteRole() {
    console.log("Delete Role");
    inquirer
    .prompt([
        {
            type: "list",
            name: "role",
            message: "Which department would you like to delete?",
            choices: rolesList()
        }
    ])
    .then(response => {
        db.query('DELETE * FROM roles WHERE id = ?', response.role, (err, results) => {
            if(err) throw err; 
        })
    })
    .then(res => {
        console.log("Role deleted sucessfully");
        mainMenu();
    }) 
}

// DEPARTMENTS functions

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

// Function to return all departments as an array
function departmentsList() {
    return db.query("SELECT * FROM departments as d", (err,res) => {
        if(err) throw err;
    }) 
    .then(response => {
        return departments = response[0].map(department => {
            return {
                name: d.name,
                value: d.id
            }
        })
    })      
}

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