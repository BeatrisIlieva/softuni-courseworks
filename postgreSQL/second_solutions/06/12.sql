SELECT 
	MIN(average_area) AS min_average_area
FROM (
	SELECT
		AVG(area_in_sq_km) AS average_area
	FROM
		continents
	JOIN
		countries
	USING 
		(continent_code)
	GROUP BY
		continent_code
) AS average;