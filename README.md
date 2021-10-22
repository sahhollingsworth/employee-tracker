# Employee Tracker
TBD

## Summary
TBD

* Upon application start, user is presented with several selectable options:
  * View all departments
    * Upon selection: A formatted table is generated showing department names and department ids.
  * View all roles
    * Upon selection: User is presented with the job title, role id, the department to which that role belongs.
  * View all employees
    * Upon selection: A formatted table is generated showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and any managers to which that employees reports.
  * Add a department
    * Upon selection: User is prompted to enter the name of the department and that department is then added to the database.
  * Add a role
    * Upon selection: User is prompted to enter the name, salary, and department for the role. That role is then added to the database.
  * Add an employee.
    * Upon selection: User is prompted to enter the employee’s first name, last name, role, and manager. That employee is then added to the database.
  * Update an employee role
    * Upon selection: User is prompted to select an employee and to update to their role. This information is then updated in the database.

## Employee Tracker Application
[Demo of Employee Tracker application available here.](somelink)

### Command Line Interface
Command line interface - Prompts
![Image UI descriptofpicture](./whateverfile.filetype)

## Installation
Ensure you have Node.js installed locally to install packages to and from the public npm registry. [Node.js installation documentation.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Install dependencies `npm install`
Required when when you first set up the project for local development or use OR if any changes are made to the project's dependencies. [More Node information here.](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

2. Start the server with `npm start`

## Usage
Run this application by:
1. Cloning the repository to your local machine.

2. Once in the root folder in your command line interface, start the application by entering `node index.js`

3. Once user prompts are complete, TBD

## Techonologies used
* [Inquirer package](https://www.npmjs.com/package/inquirer) - Used for the interactive command line user interface. 
* [Node MySQL 2 package](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js.
* [Console.Table package](https://www.npmjs.com/package/console.table) -  Prints MySQL rows to the console.
* [NPM](https://www.npmjs.com/) - Node package manager, used in conjunction with JS and Inquirer to support application logic and Command Line interface.
* [Node](https://nodejs.org/en/) - Asynchronous event-driven JavaScript runtime environment that executes JavaScript code outside a web browser
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) - Core app logic
* [Git](https://git-scm.com/doc) - Version control system to track changes to source code
* [GitHub](https://docs.github.com/en) - Hosts the code repository

## Authors
Sarah Hollingsworth
* [Github](https://github.com/sahhollingsworth)
* [LinkedIn](https://www.linkedin.com/in/sarahhollingsworth/)

## Acknowledgements