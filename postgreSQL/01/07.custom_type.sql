 CREATE TYPE mood_type
 AS ENUM (
	 'happy',
	 'sad'
 );
 
 ALTER TABLE minions_info
 ADD COLUMN mood mood_type;