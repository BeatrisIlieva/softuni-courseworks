SELECT 
	continent_name,
	TRIM(LEADING FROM continent_name) AS "trimmed"

FROM
	continents