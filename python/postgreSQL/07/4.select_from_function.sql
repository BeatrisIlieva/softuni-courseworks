CREATE OR REPLACE FUNCTION fn_find_difficulty_level(
	level INT
) RETURNS VARCHAR(100)
AS
$$
DECLARE
	difficulty_level VARCHAR(100);
BEGIN
	IF (level <= 40) THEN
		difficulty_level := 'Normal Difficulty';
	ELSIF (level <= 60) THEN
		difficulty_level := 'Nightmare Difficulty';
	ELSE
		difficulty_level := 'Hell Difficulty';
	END IF;
	
	RETURN difficulty_level;
END;
$$
LANGUAGE plpgsql;

SELECT
	ug.user_id,
	ug.level,
	ug.cash,
	fn_find_difficulty_level(ug.level)
FROM 
	users_games AS ug
ORDER BY
	ug.user_id;
	




