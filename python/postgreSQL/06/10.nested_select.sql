SELECT
	MIN(average) AS min_average_area
FROM (
	SELECT
	con.continent_code,
	AVG(area_in_sq_km) AS average
	FROM 
		continents AS con
	JOIN
		countries AS cou
	ON 
		cou.continent_code = con.continent_code
	GROUP BY
		con.continent_code
) AS average_area;