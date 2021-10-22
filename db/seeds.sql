-- Generate starter data records in the department table
INSERT INTO department (name)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Operations"),
    ("Sales");

-- Generate starter data records in the role table
INSERT INTO role (title, salary, department_id)
VALUES 
    ("Software Engineer 1", 120000, 1),
    ("Software Engineer Manager", 180000, 1),
    ("Sales Manager", 120000, 5),
    ("Sales Associate", 80000, 5),
    ("Operations Manager", 120000, 4),
    ("Operations Associate", 70000, 4),
    ("Financial Analyst", 100000, 2),
    ("Controller", 220000, 2),
    ("Senior Legal Counsel", 210000, 3),
    ("General Counsel", 300000, 3),
    ("CEO", 500000, 4);

-- Generate starter data records in the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Ava", "Sharpe", 11, null),
    (2, "Mick", "Rory", 1, 6),
    (3, "Nora", "Darhk", 1, 6),
    (4, "Ray", "Palmer", 6, 7),
    (5, "Zari", "Tomaz", 9, 1),
    (6, "Jefferson", "Jackson", 2, 1),
    (7, "Astra", "Logue", 8, 1),
    (8, "Martin", "Stein", 7, 7),
    (9, "Carter", "Hail", 4, 10),
    (10, "Wally", "West", 3, 1);