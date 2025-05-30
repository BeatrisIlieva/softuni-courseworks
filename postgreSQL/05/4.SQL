CREATE TABLE manufacturers (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

CREATE TABLE models (
	id INTEGER GENERATED ALWAYS AS IDENTITY (START WITH 1000 INCREMENT 1) PRIMARY KEY,
	model_name VARCHAR(50),
	manufacturer_id INT,
	
	CONSTRAINT fk_models_manufacturers
	FOREIGN KEY (manufacturer_id)
	REFERENCES manufacturers(id)
);

CREATE TABLE production_years (
	id SERIAL PRIMARY KEY,
	established_on DATE,
	manufacturer_id INT,
	
	CONSTRAINT fk_production_years_manufacturers
	FOREIGN KEY (manufacturer_id)
	REFERENCES manufacturers(id)
);

INSERT INTO
	manufacturers(name)
VALUES
	('BMW'),
	('Tesla'),
	('Lada');

INSERT INTO
	models(model_name, manufacturer_id)
VALUES
	('X1', 1),
	('i1', 1),
	('Model s', 2),
	('model m', 3);
	
INSERT INTO
	production_years(established_on, manufacturer_id)
VALUES
	('1916-03-01', 1),
	('2003-01-01', 2),
	('1966-05-01', 3);