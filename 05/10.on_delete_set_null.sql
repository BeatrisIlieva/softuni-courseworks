CREATE TABLE customers(
	id SERIAL PRIMARY KEY,
	customer_name VARCHAR(50)
	
);

CREATE TABLE contacts(
	id SERIAL PRIMARY KEY,
	contact_name VARCHAR(50),
	phone VARCHAR(50),
	email VARCHAR(50),
	customer_id INT,
	
	CONSTRAINT fk_contacts_customers
	FOREIGN KEY (customer_id)
	REFERENCES customers(id)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);