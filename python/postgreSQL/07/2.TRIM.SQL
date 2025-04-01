CREATE OR REPLACE FUNCTION fn_is_word_comprised(
	set_of_letters VARCHAR(100),
	word VARCHAR(100)
) RETURNS BOOLEAN
AS
$$
BEGIN
	RETURN TRIM(LOWER(word), LOWER(set_of_letters)) = '';
END;
$$

LANGUAGE plpgsql;

SELECT * FROM fn_is_word_comprised('ois tmiah%f', 'Sofia');