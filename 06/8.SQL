SELECT
	mc.country_code AS country_code,
	COUNT(*) AS mountain_range_count
FROM
	mountains_countries AS mc
JOIN
	mountains AS m
ON 
	mc.mountain_id = m.id
WHERE
	country_code IN ('US', 'RU', 'BG')
GROUP BY
	mc.country_code
ORDER BY
	country_code ASC