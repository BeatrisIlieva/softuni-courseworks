INSERT INTO 
	departments (department, manager_id)
VALUES 
	('Finance', 3),
	('Information Services', 42),
	('Document Control', 90),
	('Quality Assurance', 274)
RETURNING *;