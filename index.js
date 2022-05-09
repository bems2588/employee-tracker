const inquirer = require("inquirer");
const mysql = require("mysql2");
const Connection = require("mysql2/typings/mysql/lib/Connection");
const db = mysql.createConnection({
  user: "root",
  password: "",
  database: "employee_db",
  host: "localhost"
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
  db.query("SELECT * FROM DEPARTMENT", function (err, data) {
    if (err) throw err;
    console.table(data)
  })
}

function viewRoles() {
  db.query("SELECT * FROM ROLES", function (err, data) {
    if (err) throw err;
    console.table(data)
  })
}

function viewEmployee() {
  db.query("SELECT * FROM EMPLOYEE", function (err, data) {
    if (err) throw err;
    console.table(data)
  })
}