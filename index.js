const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table")
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password",
  database: "employees_db",

})

db.connect(function (err, data) {
  console.log("Welcome to Employee Tracker");
  startApp()
})

function startApp() {
  inquirer.prompt([
    {
      type: "list",
      name: "userSelection",
      message: "Selection",
      choices: ["View Department", "View Roles", "View Employees", "Add Department", "Add Roles", "Add Employees", "Update Employee Roles", "Exit App"]
    }

  ]).then(function (response) {
    console.log(response.userSelection)
    switch (response.userSelection) {

      case "View Department":
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
      case "Add Roles":
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
}

function viewDepartment() {
  console.log("***List of All Departments****")
  db.query("select * from department", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
}

function viewRoles() {
  db.query("SELECT * FROM ROLES", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
}

function viewEmployee() {
  db.query("SELECT * FROM EMPLOYEE", function (err, data) {
    if (err) throw err;
    console.table(data)
    startApp()
  })
}

function addDepartment() {
  console.log("*** Add New Departments****")
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
}