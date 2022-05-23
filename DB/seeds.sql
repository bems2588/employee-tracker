/*USE employees_db;*/

INSERT INTO department(name) 
VALUES
("Production"),
("Marketing"),
("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES
  ("Manager", 769879,1),
  ("Sales Person", 769879,2),
  ("Marketing Manager", 769879,3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values
("Bruno", "Marcenaro", 1, null),
("John", "Smith", 2, null),
("Paul", "Scott", 3, 1);
