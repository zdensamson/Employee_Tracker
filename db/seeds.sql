INSERT INTO department (name)
VALUES
 ('Engineering'),
 ('Sales'),
 ('Legal'),
 ('Operations'),
 ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Engineer', 75000, 1),
  ('Salesperson', 60000, 2),
  ('Lawyer', 80000, 3),
  ('Planner', 55000, 4),
  ('Financial_Analyst', 65000, 5),
  ('Lead Engineer', 100000, 1),
  ('Sales Lead', 100000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Lisa', 'Smith', 6, NULL),
  ('Mike', 'Clark', 1, 1),
  ('Tom', 'Brown', 7, NULL),
  ('Sandra', 'Gibson', 2, 3),
  ('Taylor', 'Pratt', 3, NULL),
  ('Zach', 'Sampson', 4, NULL),
  ('Dalton', 'Washington', 5, NULL);
