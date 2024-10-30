CREATE TABLE minions_birthdays (
	id INTEGER UNIQUE NOT NULL,
	name VARCHAR(50),
	date_of_birdth DATE,
	age INTEGER,
	present VARCHAR(150),
	party TIMESTAMPTZ
)