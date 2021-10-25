-- Generate starter data records in the department table
INSERT INTO departments (name)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Operations"),
    ("Sales");

-- Generate starter data records in the role table
INSERT INTO roles (title, salary, department_id)
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
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Ava", "Sharpe", 11, null),
    ("Mick", "Rory", 1, 6),
    ("Nora", "Darhk", 1, 6),
    ("Ray", "Palmer", 6, 7),
    ("Zari", "Tomaz", 9, 1),
    ("Jefferson", "Jackson", 2, 1),
    ("Astra", "Logue", 8, 1),
    ("Martin", "Stein", 7, 7),
    ("Carter", "Hail", 4, 10),
    ("Wally", "West", 3, 1);