DROP TABLE IF EXISTS department; 
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department(
  id INT  AUTO_INCREMENTE PRIMARY KEY,
  name varchar(30) NOT NULL
);

CREATE TABLE roles (
  id INT  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10) NOT NULL,
  department_id INT references department(id)
);
CREATE TABLE employee(
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id  INT references roles(id),
  manager_id INT references employee(id) on delete set null
);