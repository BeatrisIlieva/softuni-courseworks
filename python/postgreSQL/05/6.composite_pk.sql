CREATE TABLE students (
	id SERIAL PRIMARY KEY,
	student_name VARCHAR(50)
);

CREATE TABLE exams (
	id INT GENERATED ALWAYS AS IDENTITY (START WITH 101 INCREMENT 1) PRIMARY KEY,
	exam_name VARCHAR(50)
);

CREATE TABLE study_halls (
	id SERIAL PRIMARY KEY,
	study_hall_name varchar(50),
	exam_id INT,
	
	CONSTRAINT fk_study_halls_exams
	FOREIGN KEY (exam_id)
	REFERENCES exams(id)
);

CREATE TABLE students_exams (
	student_id INT,
	exam_id INT,
	
	CONSTRAINT pk_students_exams
	PRIMARY KEY (student_id, exam_id),
	
	CONSTRAINT fk_students_exams_students
	FOREIGN KEY (student_id)
	REFERENCES students(id),
	
	CONSTRAINT fk_students_exams_exams
	FOREIGN KEY (exam_id)
	REFERENCES exams(id)
);

