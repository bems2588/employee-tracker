use employees_db;
insert into department(name) values("production"), ("marketing"), ("sales");

insert into roll(title, salary, department_id) values
("manager", 769879,1);

insert into roll(title, salary, department_id) values
("manager", 769879,2);

insert into roll(title, salary, department_id) values
("manager", 769879,3);


insert into employee(first_name, last_name, role_id) values("Bruno", "Marcenaro", 1);
insert into employee(first_name, last_name, role_id) values("John", "Smith", 2);
insert into employee(first_name, last_name, role_id) values("Paul", "Scott", 3);
