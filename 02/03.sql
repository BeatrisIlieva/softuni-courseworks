SELECT DISTINCT ON (name)
	name, 
	area as area_km2
FROM 
	cities
ORDER BY
	name DESC;