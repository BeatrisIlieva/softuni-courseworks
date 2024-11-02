CREATE TABLE customers (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50),
	date DATE
);

CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
	url VARCHAR(100),
	place VARCHAR(100),
	customer_id INT,
	
	CONSTRAINT fk_photos_customers
	FOREIGN KEY (customer_id)
	REFERENCES customers(id)
);