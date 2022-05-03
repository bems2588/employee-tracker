create database employees_db;

use employees_db;


create table department(
  id INT Primary Key auto_increment,
  name varchar(35)
);

create table roles(
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT references department(id)
);
create table employee(
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id  INT references roles(id),
  manager_id INT references employee(id) on delete set null
);