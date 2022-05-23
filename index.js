const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password",
  database: "employees_db",

});

db.connect(function (err, data) {
  console.log("Welcome to Employee Tracker");
  startApp()
})

function startApp() {
  inquirer.prompt([
    {
      type: "list",
      name: "userSelection",
      message: "Please choose an action from the list",
      choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Roles", "Exit App"]
    }

  ]).then(function (response) {
    console.log(response.userSelection)
    switch (response.userSelection) {

      case "View Departments":
        viewDepartment();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "View Employees":
        viewEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Roles":
        updateEmpRoles();
        break;
      default:
        db.end();
        process.exit(0);
    }
  })
};

function viewDepartment() {
  console.log("*** List of All Departments ****")
  db.query("select * from department", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
};

function viewRoles() {
  db.query("SELECT * FROM ROLES", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
};

function viewEmployee() {
  db.query("SELECT * FROM EMPLOYEE", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
};

function addDepartment() {
  console.log("*** Add New Department ***")
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Add new department"
    }

  ]).then(function (response) {
    db.query("insert into department(name) values(?)", response.departmentName, function (err, data) {
      if (err) throw err;
      console.table(data)
      startApp()
    })
  })
};

function addRoles() {
  console.log("*** Add New Role ***")
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Add new title"
    },
    {
      type: "input",
      name: "salary",
      message: "Add salary"
    },
    {
      type: "list",
      name: "department_id",
      message: "Add department id",
      choices: [
        { name: "production", value: 1 },
        { name: "marketing", value: 2 },
        { name: "sales", value: 3 }

      ]
    }

  ]).then(function (response) {
    db.query("insert into role (title, salary, department_id) values (?, ?, ?);",
      [response.title, response.salary, response.department_id], function (err, data) {
        if (err) throw err;
        console.table(data)
        startApp()
      })
  })
};

function addEmployee() {
  console.log("*** Add New Employee ***")
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Add first name"
    },
    {
      type: "input",
      name: "last_name",
      message: "Add last name"
    },
    {
      type: "list",
      name: "roles_id",
      message: "Add role id",
      choices: [
        { name: "production", value: 1 },
        { name: "marketing", value: 2 },
        { name: "sales", value: 3 }

      ]
    },

    {
      type: "list",
      name: "manager_id",
      message: "Add manager id",
      choices: [
        { name: "Bruno Marcenaro", value: 1 },
        { name: "John Snmith", value: 2 },
        { name: "Paul Scott", value: 3 }

      ]
    }

  ]).then(function (response) {
    db.query("insert into employee(first_name, last_name, role_id, manager_id)  values (?, ?, ?, ?);",
      [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
        if (err) throw err;
        console.table(data)
        startApp()
      })
  })
};

function updateEmpRoles() {
  inquirer.prompt([
    {
      type: "list",
      name: "roles_id",
      message: "Add role id",
      choices: [
        { name: "manager", value: 1 },
        { name: "manager", value: 2 },
        { name: "manager", value: 3 }

      ]
    },

    {
      type: "list",
      name: "id",
      message: "Choose employee",
      choices: [
        { name: "Bruno Marcenaro", value: 1 },
        { name: "John smith", value: 2 },
        { name: "Paul Scott", value: 3 },
        { name: "Michael Palm", value: 4 }

      ]
    }
  ]).then(function (response) {
    db.query("update employee set role_id= ? where id= ?;",
      [response.role_id, response.id], function (err, data) {
        if (err) throw err;
        console.table(data)
        startApp()
      })
  })
}