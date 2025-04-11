SELECT 
	CONCAT_WS(
		' ', 
		name,
		state
	) AS cities_information,
	area AS area_km2

FROM cities;