SELECT
	population AS "Population",
	LENGTH(CAST(population AS VARCHAR)) AS "Length"

FROM 
	countries;